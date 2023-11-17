import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db/schema";

export const categories = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categoriesResponse = await ctx.db.query.categories.findMany({
      columns: { id: true, title: true },
    });

    return categoriesResponse;
  }),
});
