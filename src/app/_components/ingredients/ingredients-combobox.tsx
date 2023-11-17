import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useRef, useState } from "react";
import type { FC } from "react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { IngredientsComboboxContent } from "./ingredients-combobox-content";
import type { TIngredients } from "~/shared/types/ingredients";
import { SelectedIngredientList } from "./selected-ingredients-list";

type IngredientError = Merge<
  FieldError,
  (Merge<FieldError, FieldErrorsImpl<TIngredients[number]>> | undefined)[]
>;

export const IngredientsCombobox: FC<{
  selectedIngredients: TIngredients;
  onSelect: (events: TIngredients) => void;
  error?: IngredientError;
}> = ({ selectedIngredients, onSelect, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [newIngredientTitle, setNewIngredientTitle] = useState("");
  const utils = api.useUtils();

  const {
    data: ingredients,
    isLoading,
    isFetching,
  } = api.ingredients.getIngredients.useQuery();

  const { mutate: onMutateIngredients } =
    api.ingredients.addIngredient.useMutation({
      onSuccess: () => {
        void utils.ingredients.getIngredients.invalidate();
      },
    });

  const isIngredientsLoading = isLoading || isFetching;

  const handleDelete = (id: string) => {
    const filteredIngredients = selectedIngredients.filter(
      (selectedIngredient) => selectedIngredient.id !== id,
    );

    onSelect(filteredIngredients);
  };

  const handleAdd = () => {
    onMutateIngredients({ title: newIngredientTitle });
    setNewIngredientTitle("");
  };

  const handleSearch = (searchedIngredient: string) =>
    setNewIngredientTitle(searchedIngredient);

  const checkIsSelected = (id: string) => {
    return selectedIngredients.some(
      (selectedIngredient) => selectedIngredient.id === id,
    );
  };

  return (
    <div ref={containerRef}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(
              "w-full justify-between font-normal hover:bg-white",
              error &&
                "border-red-600 bg-red-200 placeholder:text-slate-600 hover:bg-red-200",
            )}
          >
            Select Ingredients
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <IngredientsComboboxContent
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          onAdd={handleAdd}
          isSelected={checkIsSelected}
          onSearch={handleSearch}
          searchedIngredient={newIngredientTitle}
          onSelectIngredients={onSelect}
          container={containerRef.current}
          isLoading={isIngredientsLoading}
        />
      </Popover>

      <SelectedIngredientList
        ingredients={selectedIngredients}
        onDelete={handleDelete}
      />
    </div>
  );
};
