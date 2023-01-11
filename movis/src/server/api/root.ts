import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { movieRouter } from "./routers/movies";
import { getAllRouter } from "./routers/getAll";
import { graphRouter } from "./routers/graph";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  movie: movieRouter,
  getAll: getAllRouter,
  graph: graphRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
