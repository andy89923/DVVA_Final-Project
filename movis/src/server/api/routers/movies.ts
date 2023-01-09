import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const movieRouter = createTRPCRouter({
  betweenYearRange: publicProcedure
    .input(z.object({ start: z.number(), end: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.movie.findMany({
        where: {
          release_date: {
            gte: input.start.toString(),
            lte: input.end.toString(),
          },
        },
        include: {
          genres: true,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany();
    
  }),
});
