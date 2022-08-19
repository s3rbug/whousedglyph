import { ServerGlyphType } from "../types/glyph"
import { instance } from "./api"

export const glyphApi = {
    getGlyphs(matchId: string){
        return instance.get<ServerGlyphType[]>(`matches/${matchId}`)
    }
}