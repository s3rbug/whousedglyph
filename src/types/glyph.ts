export type GlyphStateType = {	
	matchId: string | null;
	glyphs: Array<GlyphType>;
};

export type UiStateType = {
	isLoading: boolean;
	error: UiErrorType;
};

export type UiErrorType = {
	message: string;
	header: string;
} | null;

export enum TeamType {
	Dire = 2,
	Radiant = 3,
}

export type ServerGlyphType = {
	HeroID: number;
	MatchID: number;
	Minute: number;
	Second: number;
	Team: TeamType;
	UserSteamID: string;
	Username: string;
};

export type GlyphType = {
	heroId: number;
	heroName: string;
	nickname: string;
	time: string;
	teamType: TeamType;
	steamId: string;
	dotaUserId: string;
};
