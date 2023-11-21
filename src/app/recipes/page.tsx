"use client";
import { Suspense } from "react";
import { RecipesListSkeleton } from "../_components/recipes/recipes-list-skeleton";
import { AllRecipesList } from "../_components/recipes/all-recipes-list";
import { Input } from "../_components/ui/input";
import { useSearch, useSearchActions } from "~/shared/store/search-store";
import { RecipesPerPageSelect } from "../_components/recipes/recipes-per-page-select";

export default function RecipesPage() {
  const search = useSearch();
  const { setSearch } = useSearchActions();

  return (
    <main className="py-6">
      <div className="mb-4 flex justify-between">
        <Input
          type="text"
          placeholder="Search"
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <RecipesPerPageSelect />
      </div>

      <Suspense fallback={<RecipesListSkeleton />}>
        <AllRecipesList />
      </Suspense>
    </main>
  );
}
