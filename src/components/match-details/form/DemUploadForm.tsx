import { useRef } from "react";
import { useUploadDem } from "@/hooks/useUploadDem";
import { CenteredAlert } from "@/components/common/centered-alert/CenteredAlert";

interface Props {
  onMatchId: (matchId: string) => void;
  onUploadStart: () => void;
}

export const DemUploadForm = ({ onMatchId, onUploadStart }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadDem, isPending, error } = useUploadDem({ onMatchId, onUploadStart });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file === undefined) {
      return;
    }
    try {
      await uploadDem(file);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        accept=".dem"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
        className="grow truncate rounded-full border border-input bg-transparent px-4 py-2.5 text-left text-sm [transition:box-shadow_300ms_ease-in] hover:shadow-(--hover-shadow)"
      >
        {isPending && <span className="cursor-pointer text-muted-foreground">Uploading...</span>}
        {!isPending && (
          <span className="cursor-pointer text-muted-foreground">Choose a .dem replay file...</span>
        )}
      </button>
      {error && <CenteredAlert variant="destructive" info={error} />}
    </div>
  );
};
