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
    user_name: string,
    minute: number,
    second: number
}

export type GlyphType = {
    heroId: number;
    heroName: string;
    heroPicture: string;
    nickname: string;
    time: string;
    teamType: TeamType;
}