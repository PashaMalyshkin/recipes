import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Suspense, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { SelectedIngredientList } from "./selected-ingredients-list";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Check, Loader2, Plus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { PopoverContent } from "../ui/popover";
import type { FC } from "react";
import type { TIngredients } from "~/shared/types/ingredients";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from "react-hook-form";
import type { FormValues } from "~/shared/types/form-values";
import { Label } from "../ui/label";

type IngredientError = Merge<
  FieldError,
  (Merge<FieldError, FieldErrorsImpl<TIngredients[number]>> | undefined)[]
>;

export const IngredientsCombobox: FC<{
  control: Control<FormValues>;
  error?: IngredientError;
}> = ({ error, control }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="ingredients" className={cn(error && "text-red-500")}>
        {error ? error.message : "Ingredients"}
      </Label>

      <Controller
        control={control}
        name="ingredients"
        rules={{
          required: { value: true, message: "Ingredients are required" },
        }}
        render={({ field: { onChange, value = [] } }) => (
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
              <PopoverContent
                className="w-[calc(var(--radix-popover-trigger-width)-25px)] truncate p-0"
                container={containerRef.current}
              >
                <IngredientsComboboxContent
                  selectedIngredients={value}
                  onSelectIngredients={onChange}
                />
              </PopoverContent>
            </Popover>

            <SelectedIngredientList ingredients={value} onSelect={onChange} />
          </div>
        )}
      />
    </div>
  );
};

export const IngredientsComboboxContent: FC<{
  selectedIngredients: TIngredients;
  onSelectIngredients: (events: TIngredients) => void;
}> = ({ selectedIngredients, onSelectIngredients }) => {
  const [newIngredientTitle, setNewIngredientTitle] = useState("");
  const utils = api.useUtils();

  const handleAddIngredient = () => {
    onMutateIngredients({ title: newIngredientTitle });
    setNewIngredientTitle("");
  };

  const [ingredients, { isLoading, isFetching }] =
    api.ingredients.getIngredients.useSuspenseQuery();
  const isIngredientsLoading = isLoading || isFetching;

  const { mutate: onMutateIngredients } =
    api.ingredients.addIngredient.useMutation({
      onSuccess: () => {
        void utils.ingredients.getIngredients.invalidate();
      },
    });

  const isSelected = (id: string) => {
    return selectedIngredients.some(
      (selectedIngredient) => selectedIngredient.id === id,
    );
  };

  return (
    <Command>
      <CommandInput
        name="ingredients"
        placeholder="Search ingredient"
        value={newIngredientTitle}
        onValueChange={setNewIngredientTitle}
        isLoading={isIngredientsLoading}
      />
      <Suspense fallback={<Loader2 className="m-auto animate-spin" />}>
        <CommandEmpty className="w-[calc(var(--radix-popover-trigger-width)-30px)] truncate">
          <div className="px-4 py-2 text-xs font-medium text-slate-400">
            No ingredients found
          </div>
          <button
            className="flex w-full items-center gap-2 bg-slate-100 px-2 py-2 text-left font-medium text-slate-400"
            onClick={handleAddIngredient}
          >
            <div>
              <Plus className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-xs">New Ingredient</div>
            <div
              className="truncate text-xs text-slate-500"
              title={newIngredientTitle}
            >
              {newIngredientTitle}
            </div>
          </button>
        </CommandEmpty>

        <CommandGroup>
          <ScrollArea className="h-40">
            {ingredients?.map((ingredient) => (
              <CommandItem
                title={ingredient.title}
                className="w-[calc(var(--radix-popover-trigger-width)-30px)] cursor-pointer truncate"
                key={ingredient.id}
                value={ingredient.id}
                onSelect={(selectedIngredientId) => {
                  const filteredIngredients = selectedIngredients.filter(
                    (currentIngredient) =>
                      currentIngredient.id !== ingredient.id,
                  );

                  if (isSelected(selectedIngredientId)) {
                    return onSelectIngredients(filteredIngredients);
                  }

                  onSelectIngredients([...selectedIngredients, ingredient]);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    isSelected(ingredient.id) ? "opacity-100" : "opacity-0",
                  )}
                />
                {ingredient.title}
              </CommandItem>
            ))}
          </ScrollArea>
        </CommandGroup>
      </Suspense>
    </Command>
  );
};
