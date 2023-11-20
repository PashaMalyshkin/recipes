import type { RouterOutputs } from "~/server/api/root";

type IngredientsForRecipe =
  RouterOutputs["recipes"]["getLastRecipes"][number]["ingredientsToRecipes"];

export const IngredientsList: React.FC<{
  ingredients: IngredientsForRecipe;
}> = ({ ingredients }) => {
  return (
    <>
      <ul className="m-0 flex list-disc flex-wrap gap-4 p-0 font-light text-zinc-600">
        {ingredients.map(({ ingredient }) => (
          <li
            key={ingredient.id}
            className="flex h-6 items-center justify-between gap-1 rounded-full bg-slate-100 px-2"
          >
            {ingredient.title}
          </li>
        ))}
      </ul>
    </>
  );
};
