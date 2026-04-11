import { baseURL } from "./api";

export class GlyphApiError extends Error {
  description?: string;
  constructor(message: string, description?: string) {
    super(message);
    this.name = "GlyphApiError";
    if (description !== undefined) {
      this.description = description;
    }
  }
}

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
      const errorBody = await response.json().catch(() => null);
      throw new GlyphApiError(
        errorBody?.message ?? `HTTP ${response.status}`,
        errorBody?.description,
      );
    }
    const serverGlyphs: ServerGlyphType[] = await response.json();
    return { status: response.status, glyphs: serverGlyphs };
  },

  async uploadDemFile(file: File): Promise<GetGlyphsResponse> {
    const body = new FormData();
    body.append("dem", file);
    const response = await fetch(`${baseURL}glyph/file`, { method: "POST", body });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new GlyphApiError(
        errorBody?.message ?? `HTTP ${response.status}`,
        errorBody?.description,
      );
    }
    const serverGlyphs: ServerGlyphType[] = await response.json();
    return { status: response.status, glyphs: serverGlyphs };
  },
};
