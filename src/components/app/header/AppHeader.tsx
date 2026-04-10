import { MatchDetailsForm } from "../../match-details/form/MatchDetailsForm";
import { AppTitle } from "../title/AppTitle";
import { BuyMeCoffee } from "../../buy-me-coffee/BuyMeCoffee";

export const AppHeader = () => {
  return (
    <div className="relative m-4 flex grow flex-col items-center justify-center gap-4 pt-12 lg:pt-0">
      <div className="w-[70%] max-[575.98px]:w-full lg:w-[clamp(300px,50%,400px)]">
        <AppTitle />
      </div>
      <div className="w-[70%] max-[575.98px]:w-full lg:w-[clamp(300px,50%,400px)]">
        <MatchDetailsForm />
      </div>
      <div className="flex w-full justify-center lg:fixed lg:top-6 lg:right-6 lg:w-auto">
        <BuyMeCoffee />
      </div>
    </div>
  );
};
