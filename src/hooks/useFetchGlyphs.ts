import { useMutation, useQueryClient } from "@tanstack/react-query";
import { glyphApi, GetGlyphsResponse } from "@/api/glyphApi";
import { AlertType } from "@/hooks/useGlyphs";

interface UseFetchGlyphsResult {
  mutate: (matchId: string) => Promise<void>;
  isPending: boolean;
  error: AlertType | null;
  warning: AlertType | null;
  response: GetGlyphsResponse | undefined;
}

export const useFetchGlyphs = (): UseFetchGlyphsResult => {
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending,
    error,
    data: response,
  } = useMutation({
    mutationFn: async (matchId: string) => {
      return glyphApi.getGlyphs(matchId);
    },
    onSuccess: (_response, matchId) => {
      queryClient.invalidateQueries({
        queryKey: ["glyphs", matchId],
      });
    },
  });

  let warning: AlertType | null = null;
  let parsedError: AlertType | null = null;

  if (response?.status === 202) {
    warning = {
      message: `Match is still parsing! Try again later`,
      header: "Parsing",
    };
  }

  if (error) {
    parsedError = {
      message: "Failed to fetch glyphs",
      header: "Error",
    };
  }

  const handleMutate = async (matchId: string): Promise<void> => {
    await mutateAsync(matchId);
  };

  return {
    mutate: handleMutate,
    isPending,
    error: parsedError,
    warning,
    response,
  };
};
