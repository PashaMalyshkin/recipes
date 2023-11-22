import { createTRPCRouter } from "../../trpc";
import { getCategories } from "./get-categories";

export const categories = createTRPCRouter({
  getCategories,
});
