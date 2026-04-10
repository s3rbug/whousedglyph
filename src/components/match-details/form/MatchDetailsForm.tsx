import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEffect } from "react";
import { useUrlMatchId } from "@/hooks/useUrlMatchId";
import { useFetchGlyphs } from "@/hooks/useFetchGlyphs";

type FormDataType = {
  matchId: string;
};

export const MatchDetailsForm = () => {
  const { register, handleSubmit, reset } = useForm<FormDataType>({});
  const { urlMatchId, setUrlMatchId } = useUrlMatchId();
  const { mutate: fetchGlyphs, isPending: isLoading } = useFetchGlyphs();

  const onSubmit = async (data: FormDataType) => {
    try {
      await fetchGlyphs(data.matchId);
      setUrlMatchId(data.matchId);
    } catch (error) {
      console.error("Failed to fetch glyphs:", error);
    }
  };

  useEffect(() => {
    if (urlMatchId) {
      reset();
    }
  }, [urlMatchId, reset]);

  return (
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
  );
};
