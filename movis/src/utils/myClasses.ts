type Subset = {
    name: string;
    data: Movie[];
    selected: boolean;
  };

type Movie = {
    id: number;
    title: string;
    genres: string[];    
}

export type { Subset, Movie }