import { Suspense } from "react";
import { RecipesListSkeleton } from "./_components/recipes/recipes-list-skeleton";
import { RecipesList } from "./_components/recipes/recipes-list";

export default function Home() {
  return (
    <main className="py-6">
      <Suspense fallback={<RecipesListSkeleton />}>
        <RecipesList limit={5} />
      </Suspense>
    </main>
  );
}
