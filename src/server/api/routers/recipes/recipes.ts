import { createTRPCRouter } from "../../trpc";
import { getLastRecipes } from "./get-last-recipes";
import { getAllRecipes } from "./get-all-recipes";
import { getRecipeById } from "./get-recipe-by-id";
import { addRecipe } from "./add-recipe";

export const recipes = createTRPCRouter({
  getLastRecipes,
  getAllRecipes,
  getRecipeById,
  addRecipe,
});
