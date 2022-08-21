# Go REST API Glyph

This Go REST API for Dota 2 created with idea to get all glyph usages and information about user in simple JSON format

## Install
`git clone https://github.com/Masedko/go_api_glyph.git`

Run `go get -d ./...` from a directory of your project to download all go-gettable dependencies.

And then `go run .` to run server on `localhost:8080`.

## Get all glyph information in Match with MatchID

### Request

`GET /matches/id`

`curl -i -H 'Accept: application/json' http://localhost:8080/matches/6707633683`
### Response

    HTTP/1.1 200 OK
    Content-Length: 1102
    Content-Type: application/json; charset=utf-8
    Vary: Origin
    Date: Sat, 20 Aug 2022 10:31:37 GMT

    [{"username":"想像力상상력想像力—— —— —","user_steamID":76561198392036633,"minute":5,"second":23,"heroID":39},
    {"username":"NothingToSay","user_steamID":76561198134243802,"minute":11,"second":6,"heroID":90},
    {"username":"NothingToSay","user_steamID":76561198134243802,"minute":14,"second":40,"heroID":90},
    {"username":"me sleeping","user_steamID":76561198262479756,"minute":15,"second":57,"heroID":47},
    {"username":"NothingToSay","user_steamID":76561198134243802,"minute":28,"second":44,"heroID":90},
    {"username":"Hao","user_steamID":76561198281846390,"minute":30,"second":42,"heroID":114},
    {"username":"NothingToSay","user_steamID":76561198134243802,"minute":33,"second":35,"heroID":90},
    {"username":"Довольный","user_steamID":76561198073597242,"minute":47,"second":3,"heroID":3},
    {"username":"NothingToSay","user_steamID":76561198134243802,"minute":47,"second":7,"heroID":90},
    {"username":"NothingToSay","user_steamID":76561198134243802,"minute":65,"second":7,"heroID":90},
    {"username":"me sleeping","user_steamID":76561198262479756,"minute":74,"second":40,"heroID":47}]
### Documentation
`http://localhost:8080/docs`
### Schema
`http://localhost:8080/docs/openapi.json`
