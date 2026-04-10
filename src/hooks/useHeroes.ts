import { useQuery } from "@tanstack/react-query";
import { heroesApi, HeroType } from "@/api/heroesApi";

export const useHeroes = (): { heroes: HeroType[]; isLoading: boolean } => {
  const { data, isLoading } = useQuery({
    queryKey: ["heroes"],
    queryFn: heroesApi.getHeroes,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });
  return { heroes: data ?? [], isLoading };
};
