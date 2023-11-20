import { desc } from "~/server/db/schema/index";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";
import { ingredientsToRecipes } from "~/server/db/schema/ingredients";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const recipes = createTRPCRouter({
  getLastRecipes: publicProcedure.query(async ({ ctx }) => {
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
    });

    return recipesResponse;
  }),
  getAllRecipes: publicProcedure.query(async ({ ctx }) => {
    const recipesResponse = await ctx.db.query.recipes.findMany({
      orderBy: desc(recipesSchema.createdAt),
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
  addRecipe: publicProcedure
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
        const [newRecipe] = await tx
          .insert(recipesSchema)
          .values({
            title: input.name,
            categoryId: input.categoryId,
            description: input.description,
            author: input.author,
            id: input.slug,
          })
          .returning();

        if (!newRecipe) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Failed to create recipe",
          });
        }

        await Promise.all(
          input.ingredientsIds.map(async (id) => {
            return await tx
              .insert(ingredientsToRecipes)
              .values({ ingredientId: id, recipeId: newRecipe.id });
          }),
        );
      });
    }),
});
