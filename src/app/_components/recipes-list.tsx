"use client";

import { api } from "~/trpc/react";

export const RecipesList = () => {
  const { data, isLoading } = api.recipes.getAllRecipes.useQuery();

  if (isLoading) {
    return null;
  }

  return (
    <div>
      {data?.map((recipe) => <div key={recipe.id}>{recipe.title}</div>)}
    </div>
  );
};
