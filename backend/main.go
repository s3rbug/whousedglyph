package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/Masedko/go_api_glyph/parser"
	"github.com/Masedko/go_api_glyph/structs"
	"github.com/Masedko/go_api_glyph/utils"
	"github.com/rs/cors"
	"github.com/swaggest/rest/response/gzip"
	"github.com/swaggest/rest/web"
	"github.com/swaggest/swgui/v4emb"
	"github.com/swaggest/usecase"
	"github.com/swaggest/usecase/status"
)

func main() {
	s := web.DefaultService()

	s.OpenAPI.Info.Title = "Glyph by MatchID API"
	s.OpenAPI.Info.WithDescription("This service provides API to get glyph usage in Dota 2 match based on match_id")
	s.OpenAPI.Info.Version = "v0.2.1"

	// Setup middlewares.
	s.Wrap(
		gzip.Middleware,
	)

	s.Use(cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{
			http.MethodGet,
		},
		AllowedHeaders:   []string{"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With"},
		AllowCredentials: false,
	}).Handler)

	s.Get("/matches/{id}", getGlyphsByID())

	s.Get("/matches", getMatches())

	s.Docs("/docs", v4emb.New)

	log.Println("Starting service")
	if err := http.ListenAndServe("localhost:8080", s); err != nil {
		log.Fatal(err)
	}
}

func getMatches() usecase.Interactor {
	var Demos []string
	u := usecase.NewIOI(nil, Demos, func(ctx context.Context, _, output interface{}) error {
		filename := "match_ids.json"
		file, err := ioutil.ReadFile(filename)
		if err != nil {
			return status.Wrap(err, status.Internal)
		}
		err = json.Unmarshal(file, &Demos)
		if err != nil {
			return status.Wrap(err, status.Internal)
		}
		out := output.(*[]string)
		*out = Demos
		return nil
	})
	u.SetTags("Matches")
	return u
}

func getGlyphsByID() usecase.Interactor {
	var glyphs []structs.Glyph

	type getGlyphByIDInput struct {
		ID string `path:"id"`
	}

	u := usecase.NewIOI(getGlyphByIDInput{}, glyphs, func(ctx context.Context, input, output interface{}) error {
		in := input.(getGlyphByIDInput)

		match_id := (in.ID)

		fmt.Println("Requested MatchId: " + match_id)

		filename := match_id + ".dem"

		stateOfMatchID, err := utils.IsDownloadedDemo(match_id)
		if err != nil {
			return status.Wrap(err, status.Internal)
		}
		if stateOfMatchID {
			// Downloading demo file
			sb, err := utils.GetMatchStructWithMatchID(match_id)

			if err != nil {
				return status.Wrap(err, status.Internal)
			}

			URL_demo := fmt.Sprintf("http://replay%d.valve.net/570/%d_%d.dem.bz2", sb[0].Cluster, sb[0].Match_id, sb[0].Replay_salt)

			err = utils.RetrieveFileWithURL(URL_demo, sb, filename)
			if err != nil {
				return status.Wrap(err, status.Internal)
			}

			fmt.Printf("File %d.dem is downloaded\n", sb[0].Match_id)

			glyphs, err = parser.ParseDemo(filename, match_id)

			if err != nil {
				return status.Wrap(err, status.Internal)
			}

			err = os.Remove("dem_files/" + filename)

			if err != nil {
				return status.Wrap(err, status.Internal)
			}
		} else {
			filename := "parsed_matches/" + match_id + ".json"
			file, err := ioutil.ReadFile(filename)
			if err != nil {
				return status.Wrap(err, status.Internal)
			}
			err = json.Unmarshal(file, &glyphs)
			if err != nil {
				return status.Wrap(err, status.Internal)
			}
		}

		fmt.Printf("File %v is parsed\n", filename)
		utils.AppendDownloadedDemo(match_id)

		out := output.(*[]structs.Glyph)
		*out = glyphs

		return nil
	})
	u.SetTags("Glyphs")
	u.SetExpectedErrors(status.NotFound)

	return u
}
