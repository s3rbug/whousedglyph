import { HeroType } from "@/api/heroesApi";
import { TeamType } from "./glyph.type";

export const parseTime = (minute: number, second: number): string => {
  function parsedValue(time: number) {
    return time < 10 ? `0${time}` : time;
  }

  return `${parsedValue(minute)}:${parsedValue(second)}`;
};

export const getHeroId = (heroId: number, heroes: HeroType[]): number => {
  const hero = heroes.find((hero) => hero.id === heroId);
  return hero ? heroId : 0;
};

export const getHeroName = (heroId: number, heroes: HeroType[]): string => {
  const hero = heroes.find((hero) => hero.id === heroId);
  return hero?.localized_name ?? "unknown";
};

export const getDotaId = (userId: string): string => {
  return (BigInt(userId) - BigInt("76561197960265728")).toString();
};

export const getTeamType = (teamCode: number): TeamType => {
  return teamCode === TeamType.Radiant ? TeamType.Radiant : TeamType.Dire;
};
