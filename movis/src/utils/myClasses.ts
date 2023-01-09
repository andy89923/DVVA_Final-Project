import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type MovieData = RouterOutput["movie"]["getAll"][number]
// type aaMovieData = RouterOutput["movie"]["betweenYearRange"][number]

type Subset = {
    name: string;
    data: MovieData[];
    selected: boolean;
  };




export type { Subset, MovieData }