import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db/schema";

export const categories = createTRPCRouter({
  getCategories: publicProcedure.query(async () => {
    const categoriesResponse = await db.query.categories.findMany();

    return categoriesResponse;
  }),
});
