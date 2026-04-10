import { useQuery } from "@tanstack/react-query";
import { glyphApi, ServerGlyphType } from "@/api/glyphApi";
import { GlyphType } from "@/components/glyph/glyph.type";
import {
  getHeroId,
  getHeroName,
  parseTime,
  getTeamType,
  getDotaId,
} from "@/components/glyph/glyph";
import { useHeroes } from "@/hooks/useHeroes";
import { HeroType } from "../api/heroesApi";

export type AlertType = {
  message: string;
  header: string;
};

interface UseGlyphsResult {
  glyphs: GlyphType[];
  isLoading: boolean;
  error: AlertType | null;
  warning: AlertType | null;
  matchId: string | null;
  refetch: () => Promise<UseGlyphsResult>;
}

const mapServerGlyph = (serverGlyph: ServerGlyphType, heroes: HeroType[]): GlyphType => {
  return {
    heroId: getHeroId(serverGlyph.HeroID, heroes),
    heroName: getHeroName(serverGlyph.HeroID, heroes),
    nickname: serverGlyph.Username,
    time: parseTime(serverGlyph.Minute, serverGlyph.Second),
    teamType: getTeamType(serverGlyph.Team),
    steamId: serverGlyph.UserSteamID,
    dotaUserId: getDotaId(serverGlyph.UserSteamID),
  };
};

export const useGlyphs = (matchId: string | null): UseGlyphsResult => {
  const { heroes, isLoading: heroesLoading } = useHeroes();

  const {
    data,
    isLoading: glyphsLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["glyphs", matchId],
    queryFn: async () => {
      if (!matchId) {
        throw new Error("Match ID is required");
      }
      return glyphApi.getGlyphs(matchId);
    },
    enabled: !!matchId,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("202")) {
        return false;
      }
      return failureCount < 1;
    },
  });

  let glyphs: GlyphType[] = [];
  let warning: AlertType | null = null;
  let parsedError: AlertType | null = null;

  if (data) {
    if (data.status === 202) {
      warning = {
        message: `Match ${matchId} is still parsing! Try again later`,
        header: "Parsing",
      };
    } else {
      glyphs = data.glyphs.map((serverGlyph) => mapServerGlyph(serverGlyph, heroes));
    }
  }

  if (error) {
    parsedError = {
      message: `Match '${matchId}' is not found`,
      header: "Not found",
    };
  }

  const handleRefetch = async (): Promise<UseGlyphsResult> => {
    await refetch();
    return useGlyphs(matchId);
  };

  return {
    glyphs,
    isLoading: glyphsLoading || heroesLoading,
    error: parsedError,
    warning,
    matchId,
    refetch: handleRefetch,
  };
};
