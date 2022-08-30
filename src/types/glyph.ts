export type GlyphStateType = {
    matchId: string;
    queryMatchId: string | null;
    glyphs: Array<GlyphType>;
}

export type UiStateType = {
    isLoading: boolean;
    error: UiErrorType;
}

export type UiErrorType = {
    message: string,
    header: string
} | null

export enum TeamType {
    Dire = 0,
    Radiant
}

export type ServerGlyphType = {
    username: string,
    minute: number,
    second: number,
    heroID: number,
    user_steamID: string,
    team: 2 | 3,
}

export type GlyphType = {
    heroId: number;
    heroName: string;
    nickname: string;
    time: string;
    teamType: TeamType;
    steamId: string;
    dotaUserId: string
}