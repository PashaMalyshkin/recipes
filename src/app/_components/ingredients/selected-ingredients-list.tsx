import { X } from "lucide-react";
import type { FC } from "react";
import type { TIngredients } from "~/shared/types/ingredients";

export const SelectedIngredientList: FC<{
  ingredients: TIngredients;
  onDelete: (id: string) => void;
}> = ({ ingredients, onDelete }) => {
  return (
    <div className="mt-2 flex flex-wrap gap-4">
      {ingredients.slice(0, 2).map((ingredient) => (
        <div
          key={ingredient.id}
          className="flex h-6 items-center gap-2 rounded-full bg-slate-100 px-2"
        >
          <div className="max-w-[120px] truncate">{ingredient.title}</div>
          <button
            type="button"
            className="h-fit w-fit p-0"
            onClick={() => onDelete(ingredient.id)}
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
