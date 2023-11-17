"use client";

import { api } from "~/trpc/react";
import { RecipeCard } from "./recipe-card";
import { NoRecipes } from "./no-recipes";
import { Loader2 } from "lucide-react";
export const RecipesList = () => {
  const [recipes, { isFetching }] =
    api.recipes.getAllRecipes.useSuspenseQuery();
  return (
    <>
      {!recipes.length && <NoRecipes />}
      {isFetching ? (
        <Loader2 className="m-auto mt-24 animate-spin text-white" />
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </>
  );
};
