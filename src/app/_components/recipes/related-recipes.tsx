import { RelatedRecipeCard } from "./related-recipe-card";

export type RelatedRecipes = {
  id: string;
  title: string;
  description: string;
}[];
export const RelatedRecipes = ({
  relatedRecipes,
}: {
  relatedRecipes: RelatedRecipes;
}) => {
  return (
    <>
      <h3 className="text-white">Related Recipes</h3>
      <ul className="flex gap-4">
        {relatedRecipes.map((relatedRecipe) => (
          <RelatedRecipeCard
            key={relatedRecipe.id}
            relatedRecipe={relatedRecipe}
          />
        ))}
      </ul>
    </>
  );
};
