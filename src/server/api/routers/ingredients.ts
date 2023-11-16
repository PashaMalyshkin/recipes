import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ingredients as ingredientsSchema } from "~/server/db/schema/ingredients";
import { desc } from "drizzle-orm";

export const ingredients = createTRPCRouter({
  getIngredients: publicProcedure.query(async ({ ctx }) => {
    const ingredientsResponse = ctx.db.query.ingredients.findMany({
      orderBy: desc(ingredientsSchema.createdAt),
    });

    return ingredientsResponse;
  }),
  addIngredient: publicProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(ingredientsSchema).values({ title: input.title });
    }),
});
