"use client";

import { api } from "~/trpc/react";
import { RecipeCard } from "./recipe-card";
import { RecipesListSkeleton } from "./recipes-list-skeleton";

export const RecipesList = () => {
  const { data, isLoading } = api.recipes.getAllRecipes.useQuery();

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {isLoading || !data ? (
        <RecipesListSkeleton />
      ) : (
        <>
          {data.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </>
      )}
    </ul>
  );
};
