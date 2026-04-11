import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { useUrlMatchId } from "@/hooks/useUrlMatchId";
import { useFetchGlyphs } from "@/hooks/useFetchGlyphs";
import { DemUploadForm } from "./DemUploadForm";
import { useGlyphError } from "@/context/GlyphErrorContext";
import { GlyphApiError } from "@/api/glyphApi";

type Mode = "matchId" | "dem";

type FormDataType = {
  matchId: string;
};

export const MatchDetailsForm = () => {
  const [mode, setMode] = useState<Mode>("matchId");
  const { register, handleSubmit, reset } = useForm<FormDataType>({});
  const { urlMatchId, setUrlMatchId } = useUrlMatchId();
  const { mutate: fetchGlyphs, isPending: isLoading } = useFetchGlyphs();
  const { setFetchError } = useGlyphError();

  const onSubmit = async (data: FormDataType) => {
    setFetchError(null);
    try {
      await fetchGlyphs(data.matchId);
      setUrlMatchId(data.matchId);
    } catch (error) {
      const desc = error instanceof GlyphApiError ? error.description : undefined;
      setFetchError({
        header: "Error",
        message: error instanceof Error ? error.message : "Failed to fetch glyphs",
        ...(desc !== undefined && { description: desc }),
      });
    }
  };

  useEffect(() => {
    if (urlMatchId) {
      reset();
    }
  }, [urlMatchId, reset]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex overflow-hidden rounded-full border border-input">
        <Button
          type="button"
          variant={mode === "matchId" ? "default" : "ghost"}
          className="flex-1 rounded-full rounded-r-none border-0"
          onClick={() => setMode("matchId")}
        >
          Match ID
        </Button>
        <Button
          type="button"
          variant={mode === "dem" ? "default" : "ghost"}
          className="flex-1 rounded-full rounded-l-none border-0"
          onClick={() => setMode("dem")}
        >
          Demo file
        </Button>
      </div>
      {mode === "matchId" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Input
              className="grow rounded-full [transition:box-shadow_300ms_ease-in] hover:shadow-(--hover-shadow) focus:shadow-(--hover-shadow)"
              type="text"
              placeholder="Enter match id"
              {...register("matchId", { required: "Enter match id" })}
            />
            <Button className="h-auto rounded-full px-6 py-2.5" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      )}
      {mode === "dem" && (
        <DemUploadForm onMatchId={setUrlMatchId} onUploadStart={() => setUrlMatchId(null)} />
      )}
    </div>
  );
};
