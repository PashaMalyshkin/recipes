"use client";

import { api } from "~/trpc/react";
import { RecipeCard } from "./recipe-card";
import { NoRecipes } from "./no-recipes";
import { Loader2 } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { RecipesListPagination } from "./recipes-list-pagination";
import {
  useRecipesPaginationLimit,
  useRecipesPaginationOffset,
  useRecipesSearch,
} from "~/shared/store/recipes-store";

export const AllRecipesList = () => {
  const search = useRecipesSearch();
  const debouncedSearch = useDebounce<string>(search, 200);
  const limit = useRecipesPaginationLimit();
  const offset = useRecipesPaginationOffset();

  const [data, { isFetching }] = api.recipes.getAllRecipes.useSuspenseQuery(
    {
      search: debouncedSearch,
      limit,
      offset,
    },
    { keepPreviousData: true },
  );
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(data?.count / limit);
  return (
    <>
      <div className="h-8 w-8">
        {isFetching && <Loader2 className="m-auto animate-spin text-white" />}
      </div>
      {!data.recipes.length && <NoRecipes />}
      <div className="flex flex-col justify-between gap-4">
        {data.recipes.length > 0 && (
          <ul className="grid min-h-[624px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {data.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        )}

        {data.recipes.length > 0 && (
          <RecipesListPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};
