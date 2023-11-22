import { desc } from "drizzle-orm";
import { publicProcedure } from "../../trpc";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";

export const getLastRecipes = publicProcedure.query(async ({ ctx }) => {
  const recipesResponse = await ctx.db.query.recipes.findMany({
    orderBy: desc(recipesSchema.createdAt),
    limit: 5,
    with: {
      ingredientsToRecipes: {
        with: {
          ingredient: true,
        },
      },
    },
    columns: { createdAt: false },
  });

  return recipesResponse;
});
