import type { RouterOutputs } from "~/server/api/root";

export const IngredientsList: React.FC<{
  ingredients: RouterOutputs["recipes"]["getAllRecipes"][number]["ingredientsToRecipes"];
}> = ({ ingredients }) => {
  return (
    <>
      <p className="text-lg font-medium">Ingredients:</p>
      <ul className="flex list-disc flex-col flex-wrap pl-6 font-light text-zinc-600">
        {ingredients.map(({ ingredient }) => (
          <li key={ingredient.id}>{ingredient.title}</li>
        ))}
      </ul>
    </>
  );
};
