import { Suspense } from "react";
import { RecipesListSkeleton } from "../_components/recipes/recipes-list-skeleton";
import { RecipesList } from "../_components/recipes/recipes-list";

export default function RecipesPage() {
  return (
    <main className="py-6">
      <Suspense fallback={<RecipesListSkeleton />}>
        <RecipesList />
      </Suspense>
    </main>
  );
}
