package utils

import (
	"compress/bzip2"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/Masedko/go_api_glyph/structs"
	valid "github.com/asaskevich/govalidator"
)

func parseMatch(jsonBuffer []byte) ([]structs.Match, error) {

	match := []structs.Match{}

	err := json.Unmarshal(jsonBuffer, &match)
	if err != nil {
		return nil, err
	}

	return match, nil
}

func GetMatchStructWithMatchID(match_id string) ([]structs.Match, error) {
	URL_id := "https://api.opendota.com/api/replays?match_id=" + match_id
	resp, err := http.Get(URL_id)
	if err != nil {
		return nil, err
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	sb, err := parseMatch(body)
	if err != nil {
		return nil, err
	}
	return sb, nil
}

func RetrieveFileWithURL(URL_demo string, sb []structs.Match, filename string) error {
	resp, err := http.Get(URL_demo)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return errors.New("Response is" + fmt.Sprint(resp.StatusCode) + "from" + URL_demo)
	}
	r_bz2 := bzip2.NewReader(resp.Body)
	outfile, err := os.Create("dem_files/" + filename)
	defer outfile.Close()
	_, err = io.Copy(outfile, r_bz2)
	if err != nil {
		return err
	}
	return nil
}

func CheckMatchIDCorrectness(match_id string) bool {
	if valid.IsInt(match_id) {
		return true
	}
	return false
}

func StringInSlice(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func IsDownloadedDemo(match_id string) (bool, error) {
	IsDownloaded := false
	var Demos []string
	filename := "match_ids.json"
	file, err := ioutil.ReadFile(filename)
	if err != nil {
		return false, err
	}
	err = json.Unmarshal(file, &Demos)
	if err != nil {
		return false, err
	}
	if !StringInSlice(Demos, match_id) {
		IsDownloaded = true
	}
	return IsDownloaded, nil
}

func AppendDownloadedDemo(match_id string) error {
	var Demos []string
	filename := "match_ids.json"
	file, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	err = json.Unmarshal(file, &Demos)
	if err != nil {
		return err
	}
	if !StringInSlice(Demos, match_id) {
		Demos = append(Demos, match_id)
		file, err = json.Marshal(Demos)
		if err != nil {
			return err
		}
		_ = ioutil.WriteFile("match_ids.json", file, 0644)
	}
	return nil
}
