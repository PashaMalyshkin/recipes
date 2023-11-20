import { X } from "lucide-react";
import type { FC } from "react";
import type { TIngredients } from "~/shared/types/ingredients";

export const SelectedIngredientList: FC<{
  ingredients: TIngredients;
  onSelect: (ingredients: TIngredients) => void;
}> = ({ ingredients, onSelect }) => {
  const handleDelete = (id: string) => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id,
    );

    onSelect(filteredIngredients);
  };

  return (
    <div className="mt-2 flex flex-wrap gap-4">
      {ingredients.slice(0, 2).map((ingredient) => (
        <div
          key={ingredient.id}
          className="flex h-6 w-32 items-center justify-between gap-2 rounded-full bg-slate-100 px-2"
        >
          <div className="truncate">{ingredient.title}</div>
          <button
            type="button"
            className="h-fit w-fit p-0"
            onClick={() => handleDelete(ingredient.id)}
          >
            <X className="mt-[2px] h-4 w-4 text-slate-500" />
          </button>
        </div>
      ))}

      {ingredients.length > 2 && (
        <div className="flex h-6 items-center gap-2 rounded-full bg-slate-100 px-2">
          <div>{`+${ingredients.length - 2} more`}</div>
        </div>
      )}
    </div>
  );
};
