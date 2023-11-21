"use client";

import { api } from "~/trpc/react";
import { RecipeCard } from "./recipe-card";
import { NoRecipes } from "./no-recipes";
import { Loader2 } from "lucide-react";
import { useSearch } from "~/shared/store/search-store";
import { useDebounce } from "usehooks-ts";
import {
  usePaginationLimit,
  usePaginationOffset,
} from "~/shared/store/pagination-store";
import { RecipesListPagination } from "./recipes-list-pagination";

export const AllRecipesList = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce<string>(search, 500);
  const limit = usePaginationLimit();
  const offset = usePaginationOffset();

  const [data, { isFetching }] = api.recipes.getAllRecipes.useSuspenseQuery(
    {
      search: debouncedSearch,
      limit,
      offset,
    },
    { keepPreviousData: true },
  );

  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil((data?.count ?? 0) / limit);
  const isLastPage = currentPage === totalPages;
  const isFirstPage = offset === 0;

  return (
    <>
      <div className="h-8 w-8">
        {isFetching && <Loader2 className="m-auto animate-spin text-white" />}
      </div>
      {!data.recipes.length && <NoRecipes />}
      <div className="flex flex-col justify-between gap-4">
        {data.recipes.length > 0 && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {data.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        )}
        {totalPages > 1 && data.recipes.length > 0 && (
          <RecipesListPagination
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        )}
      </div>
    </>
  );
};
