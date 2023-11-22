import { createTRPCRouter } from "~/server/api/trpc";
import { recipes } from "./recipes/recipes";
import { categories } from "./categories/categories";
import { ingredients } from "./ingredients/ingredients";
import type { inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  recipes,
  categories,
  ingredients,
});

export type AppRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
