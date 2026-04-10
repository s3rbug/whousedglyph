import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { AlertType } from "@/hooks/useGlyphs";

interface Props {
  info: AlertType;
  variant: "destructive" | "warning";
}

export const CenteredAlert = ({ info, variant }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <Alert variant={variant} className="max-w-lg">
        <AlertTitle>{info.header}</AlertTitle>
        <AlertDescription>{info.message}</AlertDescription>
      </Alert>
    </div>
  );
};
