"use client";
import { Suspense } from "react";
import { RecipesListSkeleton } from "../_components/recipes/recipes-list-skeleton";
import { AllRecipesList } from "../_components/recipes/all-recipes-list";
import { Input } from "../_components/ui/input";
import { RecipesPerPageSelect } from "../_components/recipes/recipes-per-page-select";
import {
  useRecipesActions,
  useRecipesSearch,
} from "~/shared/store/recipes-store";

export default function RecipesPage() {
  const search = useRecipesSearch();
  const { setSearch } = useRecipesActions();

  return (
    <main className="py-6">
      <div className="mb-4 flex justify-between gap-2">
        <Input
          type="text"
          placeholder="Search"
          className="max-w-xs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <RecipesPerPageSelect />
      </div>

      <Suspense fallback={<RecipesListSkeleton />}>
        <AllRecipesList />
      </Suspense>
    </main>
  );
}
