import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const IncludeMovieId = (minYear:number, maxYear:number) => ({
  include: {
    movies: {
      select: {
        id: true,
        // release_date: true,
      },
      where: {
        release_date: {
          gte: new Date(minYear, 0, 1).toISOString(),
          lte: new Date(maxYear, 12, 31).toISOString(),
        },
      },
    }
  }
});

export const relationRouter = createTRPCRouter({
  person: publicProcedure
  .input(z.object({ minYear: z.number(), maxYear: z.number() }))
  .query( async ({ ctx, input }) => {
    return ctx.prisma.person.findMany(IncludeMovieId(input.minYear, input.maxYear));
  }),

  country: publicProcedure
  .input(z.object({ minYear: z.number(), maxYear: z.number() }))
  .query( async ({ ctx, input }) => {
    return ctx.prisma.country.findMany(IncludeMovieId(input.minYear, input.maxYear));
  }),

  keyword: publicProcedure
  .input(z.object({ minYear: z.number(), maxYear: z.number() }))
  .query( async ({ ctx, input }) => {
    return ctx.prisma.keyword.findMany(IncludeMovieId(input.minYear, input.maxYear));
  }),

  company: publicProcedure
  .input(z.object({ minYear: z.number(), maxYear: z.number() }))
  .query( async ({ ctx, input }) => {
    return ctx.prisma.company.findMany(IncludeMovieId(input.minYear, input.maxYear));
  }),

  language: publicProcedure
  .input(z.object({ minYear: z.number(), maxYear: z.number() }))
  .query( async ({ ctx, input }) => {
    return ctx.prisma.language.findMany(IncludeMovieId(input.minYear, input.maxYear));
  }),

});
