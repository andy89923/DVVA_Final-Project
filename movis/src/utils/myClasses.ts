import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

type MovieData = RouterOutput["getAll"]["movie"][number]

const AllGenres = [
  "Animation",
  "Adventure",
  "Family",
  "Comedy",
  "Fantasy",
  "Romance",
  "Drama",
  "Action",
  "Crime",
  "Thriller",
  "Horror",
  "History",
  "Science Fiction",
  "Mystery",
  "War",
  "Music",
  "Documentary",
  "Western",
  "TV Movie"
]

type Subset = {
    name: string;
    data: MovieData[];
    selected: boolean;
  };

export { AllGenres };
export type { Subset, MovieData };