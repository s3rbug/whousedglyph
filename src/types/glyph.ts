export type GlyphStateType = {	
	matchId: string | null;
	glyphs: Array<GlyphType>;
};

export type UiStateType = {
	isLoading: boolean;
	error: AlertType;
	warning: AlertType;
};

export type AlertType = {
	message: string;
	header: string;
} | null;

export enum TeamType {
	Radiant = 2,
	Dire = 3,
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
