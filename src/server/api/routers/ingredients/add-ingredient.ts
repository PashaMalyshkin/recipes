import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { capitalize } from "~/shared/utils/capitalize";
import { TRPCError } from "@trpc/server";
import { ingredients as ingredientsSchema } from "~/server/db/schema/ingredients";

export const addIngredient = publicProcedure
  .input(
    z.object({
      title: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const capitalizedTitle = capitalize(input.title);

    const ingredient = await ctx.db
      .insert(ingredientsSchema)
      .values({ title: capitalizedTitle });

    if (!ingredient) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Ingredient with this title already exist",
      });
    }
  });
