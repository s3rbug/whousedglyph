package main

import (
	"compress/bzip2"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"

	"github.com/dotabuff/manta"
	"github.com/dotabuff/manta/dota"
	"github.com/gin-gonic/gin"
)

type Glyph struct {
	User_name    string `json:"user_name"`
	User_steamID uint64 `json:"user_steamID"`
	Minute       uint32 `json:"minute"`
	Second       uint32 `json:"second"`
}

type Match struct {
	Match_id    int `json:"match_id"`
	Cluster     int `json:"cluster"`
	Replay_salt int `json:"replay_salt"`
}

func main() {
	router := gin.Default()

	router.Use(CORSMiddleware())

	router.GET("/matches/:id", getGlyphsByID)

	router.Run("localhost:8080")

}

func parseMatch(jsonBuffer []byte) ([]Match, error) {

	match := []Match{}

	err := json.Unmarshal(jsonBuffer, &match)
	if err != nil {
		return nil, err
	}

	return match, nil
}

func GetMatchStructWithMatchID(match_id string) []Match {
	URL_id := "https://api.opendota.com/api/replays?match_id=" + match_id
	resp, err := http.Get(URL_id)
	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	sb, err := parseMatch(body)
	if err != nil {
		log.Fatalln(err)
	}
	return sb
}

func RetrieveFileWithURL(URL_demo string, sb []Match) string {
	resp, err := http.Get(URL_demo)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return err.Error()
	}
	filename := strconv.Itoa(sb[0].Match_id) + "_" + strconv.Itoa(sb[0].Replay_salt) + ".dem"
	r_bz2 := bzip2.NewReader(resp.Body)
	outfile, err := os.Create(filename)
	defer outfile.Close()
	_, err = io.Copy(outfile, r_bz2)
	return filename
}

func ParseDemo(filename string) []Glyph {
	f, err := os.Open(filename)
	if err != nil {
		log.Fatalf("unable to open file: %s", err)
	}
	defer f.Close()

	p, err := manta.NewStreamParser(f)
	if err != nil {
		log.Fatalf("unable to create parser: %s", err)
	}
	gameStartTime := 0.0
	gameCurrentTime := 0.0
	var glyphs []Glyph

	p.Callbacks.OnCDOTAUserMsg_SpectatorPlayerUnitOrders(func(m *dota.CDOTAUserMsg_SpectatorPlayerUnitOrders) error {
		if m.GetOrderType() == int32(dota.DotaunitorderT_DOTA_UNIT_ORDER_GLYPH) {
			mapEntity := p.FindEntity(m.GetEntindex()).Map()
			glyphs = append(glyphs, Glyph{
				User_name:    mapEntity["m_iszPlayerName"].(string),
				User_steamID: mapEntity["m_steamID"].(uint64),
				Minute:       uint32(gameCurrentTime-gameStartTime) / 60,
				Second:       uint32(math.Round(gameCurrentTime-gameStartTime)) % 60,
			})

		}
		return nil
	})

	p.OnEntity(func(e *manta.Entity, op manta.EntityOp) error {
		if e.GetClassName() == "CDOTAGamerulesProxy" {
			gameStartTime, err = strconv.ParseFloat(fmt.Sprint(e.Map()["m_pGameRules.m_flGameStartTime"]), 64)
			gameCurrentTime, err = strconv.ParseFloat(fmt.Sprint(e.Map()["m_pGameRules.m_fGameTime"]), 64)
		}
		return nil
	})
	p.Start()

	return glyphs
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func getGlyphsByID(c *gin.Context) {
	match_id := string(c.Param("id"))

	fmt.Println("Requested MatchId: " + match_id)

	sb := GetMatchStructWithMatchID(match_id)

	URL_demo := fmt.Sprintf("http://replay%d.valve.net/570/%d_%d.dem.bz2", sb[0].Cluster, sb[0].Match_id, sb[0].Replay_salt)

	filename := RetrieveFileWithURL(URL_demo, sb)

	fmt.Printf("File %d_%d.dem is downloaded\n", sb[0].Match_id, sb[0].Replay_salt)

	glyphs := ParseDemo(filename)

	fmt.Printf("File %d_%d.dem is parsed\n", sb[0].Match_id, sb[0].Replay_salt)

	c.IndentedJSON(http.StatusOK, glyphs)
	return
}
