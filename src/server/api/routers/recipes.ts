import { desc } from "~/server/db/schema/index";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";
import { ingredientsToRecipes } from "~/server/db/schema/ingredients";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { capitalize } from "~/shared/utils/capitalize";

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
      columns: { createdAt: false },
    });

    return recipesResponse;
  }),
  getAllRecipes: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const recipesResponse = await ctx.db.query.recipes.findMany({
        where: (recipes, { ilike, or }) =>
          or(
            ilike(recipes.title, `%${input.search}%`),
            ilike(recipes.description, `%${input.search}%`),
          ),
        orderBy: desc(recipesSchema.createdAt),
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
    }),
  getRecipeById: publicProcedure
    .input(
      z.object({
        id: z.string(),
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

      return { ...recipeResponse, categoryTitle: categoryResponse.title };
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
              .insert(ingredientsToRecipes)
              .values({ ingredientId: id, recipeId: newRecipe.id });
          }),
        );
      });
    }),
});
