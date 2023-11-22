import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";
import { capitalize } from "~/shared/utils/capitalize";
import { TRPCError } from "@trpc/server";
import { ingredientsToRecipes as ingredientsToRecipesSchema } from "~/server/db/schema/ingredients";

export const addRecipe = publicProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      author: z.string(),
      categoryId: z.string(),
      ingredientsIds: z.array(z.string()),
      slug: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.db.transaction(async (tx) => {
      const capitalizedTitle = capitalize(input.name);
      const capitalizedAuthor = capitalize(input.author);

      const [newRecipe] = await tx
        .insert(recipesSchema)
        .values({
          title: capitalizedTitle,
          categoryId: input.categoryId,
          description: input.description,
          author: capitalizedAuthor,
          id: input.slug,
        })
        .returning();

      if (!newRecipe) {
        tx.rollback();
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to create recipe",
        });
      }

      await Promise.all(
        input.ingredientsIds.map(async (id) => {
          return await tx
            .insert(ingredientsToRecipesSchema)
            .values({ ingredientId: id, recipeId: newRecipe.id });
        }),
      );
    });
  });
