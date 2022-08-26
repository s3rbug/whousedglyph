import { heroes } from './../../utils/heroes';
import { GlyphStateType, GlyphType, TeamType, ServerGlyphType } from './../../types/glyph';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GlyphStateType = {
    matchId: "",
    queryMatchId: null,
    glyphs: [] as Array<GlyphType>
}

const parseTime = (minute: number, second: number): string => {
    return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`
}

const getHeroId = (heroId: number) => {
    const hero = heroes.find(hero => hero.id === heroId)
    return hero ? heroId : 0
}

const getHeroName = (heroId: number) => {
    const hero = heroes.find(hero => hero.id === heroId)
    return hero ? hero.localized_name : "unknown"
}

const getDotaId = (userId: string): string => {
    return (BigInt(userId) - BigInt("76561197960265728")).toString()
}

const glyphSlice = createSlice({
    name: "glyph",
    initialState: initialState,
    reducers: {
        setMatchId(state, action: PayloadAction<{matchId: string}>) {
            const {matchId} = action.payload
            state.matchId = matchId
        },

        setQueryMatchId(state, action: PayloadAction<{queryMatchId: string | null}>){
            const {queryMatchId} = action.payload
            state.queryMatchId = queryMatchId
        },

        addGlyph(state, action: PayloadAction<{newGlyph: GlyphType}>){
            const {newGlyph} = action.payload
            state.glyphs.push(newGlyph)
        },

        setGlyphs(state, action: PayloadAction<{newGlyphs: ServerGlyphType[]}>){
            const {newGlyphs} = action.payload
            return {
                ...state,
                glyphs: newGlyphs.map(newGlyph => ({
                        heroId: getHeroId(newGlyph.heroID),
                        heroName: getHeroName(newGlyph.heroID),
                        nickname: newGlyph.username,
                        time: parseTime(newGlyph.minute, newGlyph.second),
                        teamType: TeamType.Dire,
                        steamId: newGlyph.user_steamID,
                        dotaUserId: getDotaId(newGlyph.user_steamID)
                    } as GlyphType)
                )
            }
        },

        clearGlyphs(state) {
            state.glyphs = [] as Array<GlyphType>
        }
    }
})

export const glyphActions = glyphSlice.actions

export default glyphSlice.reducer