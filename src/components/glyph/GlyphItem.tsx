import { Card, CardContent } from "@/components/ui/Card";

import { CustomLink } from "../common/icon-link/custom-link/CustomLink";
import { IconLink } from "../common/icon-link/IconLink";
import radiantImage from "./images/radiant.png";
import direImage from "./images/dire.png";
import steamLogo from "../../assets/steam.png";
import stratzLogo from "../../assets/stratz.png";
import dotabuffLogo from "../../assets/dotabuff.png";
import opendotaLogo from "../../assets/opendota.png";
import unknownHeroPng from "./images/hero_unknown.png";
import { GlyphType, TeamType } from "./glyph.type";

interface Props {
  glyph: GlyphType;
}

const prepareHeroFilename = (heroName: string) => {
  if (heroName === "unknown") {
    return unknownHeroPng;
  }
  return `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;
};

export const GlyphItem = ({ glyph }: Props) => {
  const getTeamTypeImage = (): string => {
    return glyph.teamType === TeamType.Dire ? direImage : radiantImage;
  };

  const getHeroLink = (): string => {
    return glyph.heroName === "unknown" ? "" : `https://liquipedia.net/dota2/${glyph.heroName}`;
  };

  return (
    <Card className="group pt-0 hover-shadow-card">
      <CustomLink href={getHeroLink()}>
        <div className="overflow-hidden">
          <img
            className="w-full transition-transform duration-300 group-hover:scale-110"
            src={prepareHeroFilename(glyph.heroName)}
            alt={glyph.heroName}
          />
        </div>
      </CustomLink>
      <CardContent className="flex grow flex-col justify-between gap-4">
        <div className="text-2xl">
          <span>
            <img
              className="mr-2.5 inline h-(--icon-size) w-(--icon-size) rounded-[10%]"
              src={getTeamTypeImage()}
              alt="Team type"
            />
            <span className="break-all">{glyph.nickname}</span>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex gap-2.5">
            <IconLink
              href={`https://steamcommunity.com/profiles/${glyph.steamId}/`}
              src={steamLogo}
              alt="steam"
              className="h-(--icon-size) w-(--icon-size)"
            />
            <IconLink
              href={`https://stratz.com/players/${glyph.dotaUserId}`}
              src={stratzLogo}
              alt="stratz"
              className="h-(--icon-size) w-(--icon-size)"
            />
            <IconLink
              href={`https://www.dotabuff.com/players/${glyph.dotaUserId}`}
              src={dotabuffLogo}
              alt="dotabuff"
              className="h-(--icon-size) w-(--icon-size)"
            />
            <IconLink
              href={`https://www.opendota.com/players/${glyph.dotaUserId}`}
              src={opendotaLogo}
              alt="opendota"
              className="h-(--icon-size) w-(--icon-size)"
            />
          </span>
          <span>
            {"Glyph time: "}
            <span className="font-bold">{glyph.time}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
