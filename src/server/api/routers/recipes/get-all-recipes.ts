import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { ilike, or, sql, desc } from "drizzle-orm";
import { recipes as recipesSchema } from "~/server/db/schema/recipes";

export const getAllRecipes = publicProcedure
  .input(
    z.object({ search: z.string(), limit: z.number(), offset: z.number() }),
  )
  .query(async ({ ctx, input }) => {
    const where = or(
      ilike(recipesSchema.title, `%${input.search}%`),
      ilike(recipesSchema.description, `%${input.search}%`),
    );

    const recipesResponse = await ctx.db.query.recipes.findMany({
      where,
      orderBy: desc(recipesSchema.createdAt),
      with: {
        ingredientsToRecipes: {
          with: {
            ingredient: true,
          },
        },
      },
      columns: { createdAt: false },
      limit: input.limit,
      offset: input.offset,
    });

    const count = await ctx.db
      .select({
        count: sql<number>`cast(count(${recipesSchema.id}) as int)`,
      })
      .from(recipesSchema)
      .where(where);

    return { recipes: recipesResponse, count: count[0]?.count ?? 0 };
  });
