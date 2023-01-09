import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { movieRouter } from "./routers/movies";
import { getAllRouter } from "./routers/getAll";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  movie: movieRouter,
  getAll: getAllRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
