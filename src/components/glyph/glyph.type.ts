export enum TeamType {
  Radiant = 2,
  Dire = 3,
}

export type GlyphType = {
  heroId: number;
  heroName: string;
  nickname: string;
  time: string;
  teamType: TeamType;
  steamId: string;
  dotaUserId: string;
};

export type GlyphStateType = {
  matchId: string | null;
  glyphs: Array<GlyphType>;
};
