import { createTRPCRouter } from "../../trpc";
import { addIngredient } from "./add-ingredient";
import { getIngredients } from "./get-ingredients";

export const ingredients = createTRPCRouter({
  getIngredients,
  addIngredient,
});
