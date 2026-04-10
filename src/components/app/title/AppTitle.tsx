import { Link } from "@tanstack/react-router";
import { useUrlMatchId } from "@/hooks/useUrlMatchId";
import { useGlyphs } from "@/hooks/useGlyphs";
import { MatchDetails } from "../../match-details/MatchDetails";
import logoImage from "./images/logo.svg";

export const AppTitle = () => {
  const { urlMatchId } = useUrlMatchId();
  const { isLoading } = useGlyphs(urlMatchId);

  const canShowMatchDetails = urlMatchId && !isLoading;

  return (
    <div className="flex">
      {canShowMatchDetails && <MatchDetails />}
      {!canShowMatchDetails && (
        <Link to="/" search={{}}>
          <img
            className="h-37.5 transition-transform duration-200 ease-in-out hover:scale-105"
            src={logoImage}
            alt="logo"
          />
        </Link>
      )}
    </div>
  );
};
