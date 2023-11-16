"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { api } from "~/trpc/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../../lib/utils";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import type { RouterOutputs } from "~/server/api/root";

type Ingredients = RouterOutputs["ingredients"]["getIngredients"];

const IngredientsCombobox = () => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [newIngredientTitle, setNewIngredientTitle] = React.useState("");
  const [selectedIngredients, setSelectedIngredients] =
    React.useState<Ingredients>([]);

  const selectedIngredientsIds = selectedIngredients.map(
    (ingredient) => ingredient.id,
  );

  const utils = api.useUtils();

  const { data: ingredients } = api.ingredients.getIngredients.useQuery();
  const { mutate: onMutateIngredients } =
    api.ingredients.addIngredient.useMutation({
      onSuccess: () => {
        void utils.ingredients.getIngredients.invalidate();
      },
    });

  const handleDeleteIngredient = (ingredient: Ingredients[number]) => {
    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.filter(
        (selectedIngredient) => selectedIngredient.id !== ingredient.id,
      ),
    );
  };

  const handleAddIngredient = () => {
    onMutateIngredients({ title: newIngredientTitle });
    setNewIngredientTitle("");
  };

  return (
    <div ref={containerRef} className="col-start-2 col-end-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="mb-2">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select Ingredients
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          container={containerRef.current}
        >
          <Command>
            <ScrollArea className="h-60">
              <CommandInput
                name="ingredients"
                placeholder="Search ingredient"
                value={newIngredientTitle}
                onValueChange={(searchedIngredient) =>
                  setNewIngredientTitle(searchedIngredient)
                }
              />
              <CommandEmpty className="text-left">
                <div className="px-4 py-2 text-xs font-medium text-slate-400">
                  No ingredients found
                </div>
                <button
                  className="flex w-full items-center gap-4 bg-slate-100 px-4 py-2 text-left font-medium text-slate-400"
                  onClick={handleAddIngredient}
                >
                  <div>
                    <Plus className="h-4 w-4 text-slate-400" />
                  </div>
                  New Ingredient
                  <div className="text-slate-500">{newIngredientTitle}</div>
                </button>
              </CommandEmpty>
              <CommandGroup>
                {ingredients?.map((ingredient) => (
                  <CommandItem
                    key={ingredient.id}
                    value={ingredient.title}
                    onSelect={() => {
                      setSelectedIngredients((prevIngredients) => {
                        if (selectedIngredientsIds.includes(ingredient.id)) {
                          return prevIngredients.filter(
                            (prevIngredient) =>
                              prevIngredient.id !== ingredient.id,
                          );
                        }

                        return [...prevIngredients, ingredient];
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedIngredientsIds.includes(ingredient.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {ingredient.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-4">
        {selectedIngredients.slice(0, 2).map((ingredient) => (
          <div
            key={ingredient.id}
            className="flex h-6 items-center gap-2 rounded-full bg-slate-100 px-2"
          >
            <div className="max-w-[120px] truncate">{ingredient.title}</div>
            <button
              type="button"
              className="h-fit w-fit p-0"
              onClick={() => handleDeleteIngredient(ingredient)}
            >
              <X className="mt-[2px] h-4 w-4 text-slate-500" />
            </button>
          </div>
        ))}
        {selectedIngredients.length > 2 && (
          <div className="flex h-6 items-center gap-2 rounded-full bg-slate-100 px-2">
            <div>{`+${selectedIngredients.length - 2} more`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CreateRecipeDialog = () => {
  const { data: categories } = api.categories.getCategories.useQuery();
  const { handleSubmit, register } = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black duration-300 hover:bg-slate-800 hover:text-white">
          Add New Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recipe</DialogTitle>
        </DialogHeader>
        <form
          id="addRecipeForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Pizza"
              className="col-span-3"
              {...register("name")}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Select>
              <SelectTrigger
                className="col-start-2 col-end-5 w-full"
                id="category"
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.title}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-start-2 col-end-5 w-full resize-none"
              {...register("description")}
            />
          </div>
          <div className="mt grid grid-cols-4 gap-4">
            <Label htmlFor="ingredients" className="text-left">
              Ingredients
            </Label>
            <IngredientsCombobox />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="author" className="text-left">
              Author
            </Label>
            <Input
              placeholder="Gordon Ramsay"
              id="author"
              className="col-span-3"
              {...register("author")}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="addRecipeForm">
            Add Recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
