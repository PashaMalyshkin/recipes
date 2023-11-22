import { z } from "zod";
import { and, eq, inArray, ne } from "drizzle-orm";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";
import { publicProcedure } from "../../trpc";
import { ingredientsToRecipes as ingredientsToRecipesSchema } from "~/server/db/schema/ingredients";

export const getRecipeById = publicProcedure
  .input(
    z.object({
      id: z.string(),
      limit: z.number().optional().default(3),
    }),
  )
  .query(async ({ ctx, input }) => {
    const recipeResponse = await ctx.db.query.recipes.findFirst({
      where: (recipes, { eq }) => eq(recipes.id, input.id),
      with: {
        ingredientsToRecipes: {
          with: {
            ingredient: true,
          },
        },
      },
      columns: { createdAt: false },
    });

    if (!recipeResponse) {
      return null;
    }

    const categoryResponse = await ctx.db.query.categories.findFirst({
      where: (categories, { eq }) =>
        eq(categories.id, recipeResponse.categoryId),
      columns: { createdAt: false },
    });

    if (!categoryResponse) {
      return null;
    }

    const ingredientsIds = recipeResponse.ingredientsToRecipes.map(
      ({ ingredientId }) => ingredientId,
    );

    const relatedRecipes = await ctx.db
      .select({
        id: recipesSchema.id,
        title: recipesSchema.title,
        description: recipesSchema.description,
      })
      .from(recipesSchema)
      .leftJoin(
        ingredientsToRecipesSchema,
        eq(recipesSchema.id, ingredientsToRecipesSchema.recipeId),
      )
      .where(
        and(
          inArray(ingredientsToRecipesSchema.ingredientId, ingredientsIds),
          ne(recipesSchema.id, input.id),
        ),
      )
      .limit(input.limit)
      .groupBy(recipesSchema.id);

    return {
      ...recipeResponse,
      categoryTitle: categoryResponse.title,
      relatedRecipes,
    };
  });
