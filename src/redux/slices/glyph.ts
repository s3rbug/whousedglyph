import { HEROES } from "../../utils/heroes_list";
import {
	GlyphStateType,
	GlyphType,
	TeamType,
	ServerGlyphType,
} from "./../../types/glyph";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GlyphStateType = {
	matchId: null,
	glyphs: [] as Array<GlyphType>,
};

const parseTime = (minute: number, second: number): string => {
	function parsedValue(time: number) {
		return time < 10 ? `0${time}` : time;
	}

	return `${parsedValue(minute)}:${parsedValue(second)}`;
};

const getHeroId = (heroId: number) => {
	const hero = HEROES.find((hero) => hero.id === heroId);
	return hero ? heroId : 0;
};

const getHeroName = (heroId: number) => {
	const hero = HEROES.find((hero) => hero.id === heroId);
	return hero ? hero.localized_name : "unknown";
};

const getDotaId = (userId: string): string => {
	return (BigInt(userId) - BigInt("76561197960265728")).toString();
};

const getTeamType = (teamType: number): TeamType => {
	return teamType === TeamType.Radiant ? TeamType.Radiant : TeamType.Dire;
};

const glyphSlice = createSlice({
	name: "glyph",
	initialState: initialState,
	reducers: {
		setMatchId(state, action: PayloadAction<{ matchId: string }>) {
			const { matchId } = action.payload;
			state.matchId = matchId;
		},

		addGlyph(state, action: PayloadAction<{ newGlyph: GlyphType }>) {
			const { newGlyph } = action.payload;
			state.glyphs.push(newGlyph);
		},

		setGlyphs(state, action: PayloadAction<{ newGlyphs: ServerGlyphType[] }>) {
			const { newGlyphs } = action.payload;

			return {
				...state,
				glyphs: newGlyphs.map(
					(newGlyph) =>
						({
							heroId: getHeroId(newGlyph.HeroID),
							heroName: getHeroName(newGlyph.HeroID),
							nickname: newGlyph.Username,
							time: parseTime(newGlyph.Minute, newGlyph.Second),
							teamType: getTeamType(newGlyph.Team),
							steamId: newGlyph.UserSteamID,
							dotaUserId: getDotaId(newGlyph.UserSteamID),
						} as GlyphType)
				),
			};
		},

		clearGlyphs(state) {
			state.glyphs = [] as Array<GlyphType>;
		},
	},
});

export const glyphActions = glyphSlice.actions;

export default glyphSlice.reducer;
