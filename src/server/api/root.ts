import { createTRPCRouter } from "~/server/api/trpc";
import { recipes } from "./routers/recipes";
import type { inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  recipes,
});

export type AppRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
