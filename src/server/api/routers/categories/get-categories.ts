import { publicProcedure } from "../../trpc";

export const getCategories = publicProcedure.query(async ({ ctx }) => {
  const categoriesResponse = await ctx.db.query.categories.findMany({
    columns: { createdAt: false },
  });

  return categoriesResponse;
});
