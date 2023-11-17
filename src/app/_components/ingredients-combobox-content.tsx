"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "../../lib/utils";
import { Check, Loader2, Plus } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import type { FC } from "react";
import type { RouterOutputs } from "~/trpc/shared";
import { PopoverContent } from "./ui/popover";

type TIngredients = RouterOutputs["ingredients"]["getIngredients"];

export const IngredientsComboboxContent: FC<{
  onAdd: () => void;
  isSelected: (id: string) => boolean;
  onSearch: (query: string) => void;
  ingredients?: TIngredients;
  selectedIngredients: TIngredients;
  searchedIngredient: string;
  container: HTMLElement | null;
  isLoading: boolean;
  onSelectIngredients: (events: TIngredients) => void;
}> = ({
  onAdd,
  isSelected,
  onSearch,
  searchedIngredient,
  ingredients,
  selectedIngredients,
  onSelectIngredients,
  container,
  isLoading,
}) => {
  return (
    <PopoverContent
      className="w-[calc(var(--radix-popover-trigger-width)-25px)] truncate p-0"
      container={container}
    >
      <Command>
        <ScrollArea className="h-60">
          <CommandInput
            name="ingredients"
            placeholder="Search ingredient"
            value={searchedIngredient}
            onValueChange={onSearch}
          />
          {!isLoading && (
            <CommandEmpty className="w-[calc(var(--radix-popover-trigger-width)-25px)] max-w-full truncate text-left">
              <div className="px-4 py-2 text-xs font-medium text-slate-400">
                No ingredients found
              </div>
              <button
                className="flex w-full items-center gap-4 bg-slate-100 px-4 py-2 text-left font-medium text-slate-400"
                onClick={onAdd}
              >
                <div>
                  <Plus className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-sm">New Ingredient</div>
                <div
                  className="truncate text-slate-500"
                  title={searchedIngredient}
                >
                  {searchedIngredient}
                </div>
              </button>
            </CommandEmpty>
          )}

          <CommandGroup>
            {isLoading ? (
              <Loader2 className="m-auto mt-6 animate-spin" />
            ) : (
              <>
                {ingredients?.map((ingredient) => (
                  <CommandItem
                    title={ingredient.title}
                    className="w-[calc(var(--radix-popover-trigger-width)-25px)] cursor-pointer truncate"
                    key={ingredient.id}
                    value={ingredient.id}
                    onSelect={(selectedIngredientId) => {
                      const filteredIngredients = selectedIngredients.filter(
                        (currentIngredient) =>
                          currentIngredient.id !== ingredient.id,
                      );

                      if (isSelected(selectedIngredientId)) {
                        onSelectIngredients(filteredIngredients);
                      } else {
                        onSelectIngredients([
                          ...selectedIngredients,
                          ingredient,
                        ]);
                      }
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
              </>
            )}
          </CommandGroup>
        </ScrollArea>
      </Command>
    </PopoverContent>
  );
};
