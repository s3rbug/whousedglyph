export type HeroType = {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
};

export const heroesApi = {
  async getHeroes(): Promise<HeroType[]> {
    const response = await fetch("https://api.opendota.com/api/heroes");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  },
};
