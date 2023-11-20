import { createTRPCRouter } from "~/server/api/trpc";
import { recipes } from "./routers/recipes";
import { categories } from "./routers/categories";
import { ingredients } from "./routers/ingredients";
import type { inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  recipes,
  categories,
  ingredients,
});

export type AppRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
