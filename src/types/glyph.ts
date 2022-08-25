export type GlyphStateType = {
    matchId: string;
    glyphs: Array<GlyphType>;
}

export type UiStateType = {
    isLoading: boolean;
}

export enum TeamType {
    Dire = 0,
    Radiant
}

export type ServerGlyphType = {
    username: string,
    minute: number,
    second: number,
    heroID: number,
    user_steamID: string
}

export type GlyphType = {
    heroId: number;
    heroName: string;
    nickname: string;
    time: string;
    teamType: TeamType;
    steamId: string
}