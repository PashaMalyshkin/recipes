import { db } from "~/server/db/schema/index";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const recipes = createTRPCRouter({
  getAllRecipes: publicProcedure.query(async () => {
    const recipes = await db.query.recipes.findMany();

    return recipes;
  }),
});
