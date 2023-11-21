"use client";

import { api } from "~/trpc/react";
import { RecipeCard } from "./recipe-card";
import { NoRecipes } from "./no-recipes";
import { Loader2 } from "lucide-react";
import { useSearch } from "~/shared/store/store";
import { useDebounce } from "usehooks-ts";

export const AllRecipesList = () => {
  const search = useSearch((state) => state.search);
  const debouncedSearch = useDebounce<string>(search, 500);

  const [recipes, { isFetching }] = api.recipes.getAllRecipes.useSuspenseQuery(
    {
      search: debouncedSearch,
    },
    { keepPreviousData: true },
  );

  return (
    <>
      <div className="h-8 w-8">
        {isFetching && <Loader2 className="m-auto animate-spin text-white" />}
      </div>
      {!recipes.length && <NoRecipes />}
      {recipes.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </>
  );
};
