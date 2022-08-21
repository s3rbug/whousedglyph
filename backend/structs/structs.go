package structs

type Glyph struct {
	Username     string `json:"username" description:"Username (not current)"`
	User_steamID uint64 `json:"user_steamID" description:"Steam64 ID"`
	Minute       uint32 `json:"minute" minimum:"0" maximum:"60" description:"Minute when glyph was used"`
	Second       uint32 `json:"second" minimum:"0" maximum:"60" description:"Second when glyph was used"`
	HeroID       uint64 `json:"heroID" description:"ID of hero (https://liquipedia.net/dota2/MediaWiki:Dota2webapi-heroes.json)"`
}

type HeroPlayer struct {
	Hero_ID   int64
	Player_ID int64
}

type Match struct {
	Match_id    int `json:"match_id"`
	Cluster     int `json:"cluster"`
	Replay_salt int `json:"replay_salt"`
}
