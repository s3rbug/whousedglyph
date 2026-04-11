import { useMutation, useQueryClient } from "@tanstack/react-query";
import { glyphApi, GlyphApiError } from "@/api/glyphApi";
import { AlertType } from "@/hooks/useGlyphs";

interface UseUploadDemOptions {
  onMatchId: (matchId: string) => void;
  onUploadStart?: () => void;
}

interface UseUploadDemResult {
  mutate: (file: File) => Promise<void>;
  isPending: boolean;
  error: AlertType | null;
}

export const useUploadDem = ({
  onMatchId,
  onUploadStart,
}: UseUploadDemOptions): UseUploadDemResult => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (file: File) => glyphApi.uploadDemFile(file),
    onMutate: () => {
      onUploadStart?.();
    },
    onSuccess: (response) => {
      const matchId = response.glyphs[0]?.MatchID?.toString();
      if (!matchId) return;
      queryClient.setQueryData(["glyphs", matchId], response);
      onMatchId(matchId);
    },
  });

  return {
    mutate: async (file) => {
      await mutateAsync(file);
    },
    isPending,
    error:
      error instanceof Error
        ? {
            message: error.message,
            header: "Error",
            ...(error instanceof GlyphApiError &&
              error.description !== undefined && { description: error.description }),
          }
        : null,
  };
};
