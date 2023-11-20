import type { RouterOutputs } from "~/server/api/root";

type IngredientsForRecipe =
  RouterOutputs["recipes"]["getRecipes"][number]["ingredientsToRecipes"];

export const IngredientsList: React.FC<{
  ingredients: IngredientsForRecipe;
}> = ({ ingredients }) => {
  return (
    <>
      <p className="text-lg font-medium">Ingredients:</p>
      <ul className="flex list-disc flex-col flex-wrap pl-6 font-light text-zinc-600">
        {ingredients.map(({ ingredient }) => (
          <li key={ingredient.id} className="truncate">
            {ingredient.title}
          </li>
        ))}
      </ul>
    </>
  );
};
