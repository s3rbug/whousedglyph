import { HEROES } from '../../utils/heroes_list';
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
    const hero = HEROES.find(hero => hero.id === heroId)
    return hero ? heroId : 0
}

const getHeroName = (heroId: number) => {
    const hero = HEROES.find(hero => hero.id === heroId)
    return hero ? hero.localized_name : "unknown"
}

const getDotaId = (userId: string): string => {
    return (BigInt(userId) - BigInt("76561197960265728")).toString()
}

const getTeamType = (teamType: 2 | 3): TeamType => {
    return teamType === 2 ? TeamType.Radiant : TeamType.Dire
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
            console.log(newGlyphs);
            
            return {
                ...state,
                glyphs: newGlyphs.map(newGlyph => ({
                        heroId: getHeroId(newGlyph.HeroID),
                        heroName: getHeroName(newGlyph.HeroID),
                        nickname: newGlyph.Username,
                        time: parseTime(newGlyph.Minute, newGlyph.Second),
                        teamType: getTeamType(newGlyph.Team),
                        steamId: newGlyph.UserSteamID,
                        dotaUserId: getDotaId(newGlyph.UserSteamID)
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