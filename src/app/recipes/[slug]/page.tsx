import { RecipeDetailsCard } from "~/app/_components/recipes/recipe-details-card";
import { Suspense } from "react";
import { RecipeDetailsCardSkeleton } from "~/app/_components/recipes/recipe-details-card-skeleton";
export default function DetailsPage() {
  return (
    <Suspense fallback={<RecipeDetailsCardSkeleton />}>
      <RecipeDetailsCard />;
    </Suspense>
  );
}
