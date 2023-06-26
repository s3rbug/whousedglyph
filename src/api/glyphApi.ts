import { ServerGlyphType } from "../types/glyph"
import { instance } from "./api"

export const glyphApi = {
    getGlyphs(matchId: string){
        return instance.post<ServerGlyphType[]>(`glyph/${matchId}`)
    }
}