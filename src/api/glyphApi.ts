import { baseURL } from "./api";

export type ServerGlyphType = {
  HeroID: number;
  MatchID: number;
  Minute: number;
  Second: number;
  Team: number;
  UserSteamID: string;
  Username: string;
};

export type GetGlyphsResponse = {
  status: number;
  glyphs: ServerGlyphType[];
};

export const glyphApi = {
  async getGlyphs(matchId: string): Promise<GetGlyphsResponse> {
    const response = await fetch(`${baseURL}glyph/${matchId}`, {
      method: "POST",
    });
    if (response.status === 202) {
      return { status: 202, glyphs: [] };
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const serverGlyphs: ServerGlyphType[] = await response.json();
    return { status: response.status, glyphs: serverGlyphs };
  },
};
