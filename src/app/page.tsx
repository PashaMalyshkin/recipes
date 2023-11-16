import { Suspense } from "react";
import { RecipesListSkeleton } from "./_components/recipes-list-skeleton";
import { RecipesList } from "./_components/recipes-list";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<RecipesListSkeleton />}>
        <RecipesList />
      </Suspense>
    </main>
  );
}
