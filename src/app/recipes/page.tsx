"use client";
import { Suspense } from "react";
import { RecipesListSkeleton } from "../_components/recipes/recipes-list-skeleton";
import { AllRecipesList } from "../_components/recipes/all-recipes-list";
import { Input } from "../_components/ui/input";
import { useSearch } from "~/shared/store/store";

export default function RecipesPage() {
  const search = useSearch((state) => state.search);
  const setSearch = useSearch((state) => state.setSearch);

  return (
    <main className="py-6">
      <Input
        type="text"
        placeholder="Search"
        className="mb-4 max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Suspense fallback={<RecipesListSkeleton />}>
        <AllRecipesList />
      </Suspense>
    </main>
  );
}
