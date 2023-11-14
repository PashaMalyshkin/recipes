import { createTRPCRouter } from "~/server/api/trpc";
import { recipes } from "./routers/recipes";

export const appRouter = createTRPCRouter({
    recipes,
});

export type AppRouter = typeof appRouter;
