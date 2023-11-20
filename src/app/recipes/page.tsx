import { Suspense } from "react";
import { RecipesListSkeleton } from "../_components/recipes/recipes-list-skeleton";
import { AllRecipesList } from "../_components/recipes/all-recipes-list";

export default function RecipesPage() {
  return (
    <main className="py-6">
      <Suspense fallback={<RecipesListSkeleton />}>
        <AllRecipesList />
      </Suspense>
    </main>
  );
}
