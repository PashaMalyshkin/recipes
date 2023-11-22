import { desc } from "drizzle-orm";
import { publicProcedure } from "../../trpc";
import { ingredients as ingredientsSchema } from "~/server/db/schema/ingredients";

export const getIngredients = publicProcedure.query(async ({ ctx }) => {
  const ingredientsResponse = await ctx.db.query.ingredients.findMany({
    orderBy: desc(ingredientsSchema.createdAt),
    columns: { createdAt: false },
  });

  return ingredientsResponse;
});
