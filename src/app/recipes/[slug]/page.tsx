import { RecipeDetailsCard } from "~/app/_components/recipes/recipe-details-card";
import { Suspense } from "react";
import { RecipeDetailsCardSkeleton } from "~/app/_components/recipes/recipe-details-card-skeleton";
export default function DetailsPage() {
  return (
    <main className="py-6">
      <Suspense fallback={<RecipeDetailsCardSkeleton />}>
        <RecipeDetailsCard />;
      </Suspense>
    </main>
  );
}
