export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: string[];
  location: {
    name: string;
    url: string;
  };
  created: string;
  first_seen_in: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  season: string;
  number: string;
}

export interface Column {
  id: "number" | "name" | "air_date" | "season";
  label: string;
  width?: number;
  align?: "left" | "right" | "center";
  format?: (value: number) => string;
}
