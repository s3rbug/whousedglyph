import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { useUrlMatchId } from "@/hooks/useUrlMatchId";
import stratzLogo from "../../assets/stratz.png";
import dotabuffLogo from "../../assets/dotabuff.png";
import opendotaLogo from "../../assets/opendota.png";
import { IconLink } from "../common/icon-link/IconLink";

export const MatchDetails = () => {
  const { urlMatchId: matchId } = useUrlMatchId();
  const [showTooltip, setShowTooltip] = useState(false);

  const copyMatchIdToClipboard = async () => {
    await navigator.clipboard.writeText(matchId ?? "");
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 500);
  };

  return (
    <Card className="w-full hover-shadow-card">
      <CardContent className="flex flex-col gap-4 pt-4">
        {matchId !== null && (
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-auto w-full py-2 text-3xl"
                onClick={copyMatchIdToClipboard}
              >
                {matchId}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Saved to clipboard</TooltipContent>
          </Tooltip>
        )}
        <div className="flex justify-around pr-4 pl-6">
          <IconLink
            href={`https://stratz.com/matches/${matchId}`}
            src={stratzLogo}
            alt="stratz"
            className="h-[calc(var(--icon-size)+5px)] w-[calc(var(--icon-size)+5px)]"
          />
          <IconLink
            href={`https://www.dotabuff.com/matches/${matchId}`}
            src={dotabuffLogo}
            alt="dotabuff"
            className="h-[calc(var(--icon-size)+5px)] w-[calc(var(--icon-size)+5px)]"
          />
          <IconLink
            href={`https://www.opendota.com/matches/${matchId}`}
            src={opendotaLogo}
            alt="opendota"
            className="h-[calc(var(--icon-size)+5px)] w-[calc(var(--icon-size)+5px)]"
          />
        </div>
      </CardContent>
    </Card>
  );
};
