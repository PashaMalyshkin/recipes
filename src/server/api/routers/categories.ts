import { createTRPCRouter, publicProcedure } from "../trpc";

export const categories = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categoriesResponse = await ctx.db.query.categories.findMany({
      columns: { createdAt: false },
    });

    return categoriesResponse;
  }),
});
