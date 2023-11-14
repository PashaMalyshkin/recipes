"use client";

import { api } from "~/trpc/react";
import { RecipeCard } from "./recipe-card";
import { NoRecipes } from "./no-recipes";

export const RecipesList = () => {
  const [recipes] = api.recipes.getAllRecipes.useSuspenseQuery();

  return (
    <>
      {!recipes.length && <NoRecipes />}
      {recipes.length && (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </>
  );
};
