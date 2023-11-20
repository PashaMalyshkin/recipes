import { Suspense } from "react";
import { RecipesListSkeleton } from "./_components/recipes/recipes-list-skeleton";
import { LastRecipesList } from "./_components/recipes/last-recipes-list";

export default function Home() {
  return (
    <main className="py-6">
      <Suspense fallback={<RecipesListSkeleton />}>
        <LastRecipesList />
      </Suspense>
    </main>
  );
}
