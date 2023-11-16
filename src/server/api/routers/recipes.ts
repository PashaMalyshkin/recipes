import { db, desc } from "~/server/db/schema/index";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";

export const recipes = createTRPCRouter({
  getAllRecipes: publicProcedure.query(async () => {
    const recipesResponse = await db.query.recipes.findMany({
      orderBy: desc(recipesSchema.createdAt),
      limit: 5,
      with: {
        ingredientsToRecipes: {
          with: {
            ingredient: true,
          },
        },
      },
    });

    return recipesResponse;
  }),
});
