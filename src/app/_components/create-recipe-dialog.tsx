"use client";

import { X, Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  SubmitHandler,
} from "react-hook-form";
import { useState, useRef } from "react";
import type { FC } from "react";

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

import { Popover, PopoverTrigger } from "./ui/popover";
import type { RouterOutputs } from "~/server/api/root";
import { IngredientsComboboxContent } from "./ingredients-combobox-content";
import { cn } from "~/lib/utils";

type TIngredients = RouterOutputs["ingredients"]["getIngredients"];

type FormValues = {
  name: string;
  categoryId: string;
  slug: string;
  description: string;
  author: string;
  ingredients: TIngredients;
};

type IngredientError = Merge<
  FieldError,
  (Merge<FieldError, FieldErrorsImpl<TIngredients[number]>> | undefined)[]
>;

const IngredientsCombobox: FC<{
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

  const handleDeleteIngredient = (ingredient: TIngredients[number]) => {
    const filteredIngredients = selectedIngredients.filter(
      (selectedIngredient) => selectedIngredient.id !== ingredient.id,
    );

    onSelect(filteredIngredients);
  };

  const handleAddIngredient = () => {
    onMutateIngredients({ title: newIngredientTitle });
    setNewIngredientTitle("");
  };

  const handleSearchIngredient = (searchedIngredient: string) =>
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
          onAdd={handleAddIngredient}
          isSelected={checkIsSelected}
          onSearch={handleSearchIngredient}
          searchedIngredient={newIngredientTitle}
          onSelectIngredients={onSelect}
          container={containerRef.current}
          isLoading={isIngredientsLoading}
        />
      </Popover>
      <div className="mt-2 flex flex-wrap gap-4">
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
  const {
    data: categories,
    isLoading,
    isFetching,
  } = api.categories.getCategories.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const isCategoriesLoading = isLoading || isFetching;
  const { mutate: onMutateRecipes } = api.recipes.addRecipe.useMutation({
    onSuccess: () => {
      void utils.recipes.getAllRecipes.invalidate();
    },
  });

  const recipeName = watch("name") || "";
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleCloseDialog = (isOpen: boolean) => {
    setIsOpen(isOpen);
    reset();
  };

  const onAddRecipe: SubmitHandler<FormValues> = (data) => {
    const newRecipe = {
      ...data,
      slug: createSlug(recipeName),
      ingredientsIds: data.ingredients.map((ingredient) => ingredient.id),
    };

    onMutateRecipes(newRecipe);
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button className="bg-white text-black duration-300 hover:bg-slate-800 hover:text-white">
          Add New Recipe
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Recipe</DialogTitle>
        </DialogHeader>
        <form
          id="addRecipeForm"
          className="grid grid-cols-2 gap-6 py-4"
          onSubmit={handleSubmit(onAddRecipe)}
        >
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              className={cn("text-left", {
                "text-red-500": errors.name,
              })}
            >
              {errors.name ? errors.name.message : "Name"}
            </Label>
            <Input
              id="name"
              placeholder="Pizza"
              className={cn({
                "border-red-600 bg-red-200 placeholder:text-slate-600":
                  errors.name,
              })}
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
                minLength: {
                  value: 5,
                  message: "Should contain at least 5 chars",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="Slug">Slug</Label>
            <Input
              id="slug"
              placeholder="Slug"
              disabled
              {...register("slug")}
              value={createSlug(recipeName)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="category"
              className={cn({
                "text-red-500": errors.categoryId,
              })}
            >
              {errors.categoryId ? errors.categoryId.message : "Category"}
            </Label>
            <Controller
              control={control}
              name="categoryId"
              rules={{
                required: {
                  value: true,
                  message: "Category is required",
                },
              }}
              render={({ field: { onChange } }) => (
                <Select onValueChange={onChange}>
                  <SelectTrigger
                    id="categoryId"
                    className={cn({
                      "border-red-600 bg-red-200 placeholder:text-slate-600":
                        errors.categoryId,
                    })}
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {isCategoriesLoading ? (
                      <Loader2 className="m-auto animate-spin" />
                    ) : (
                      <>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="cursor-pointer"
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="description"
              className={cn({
                "text-red-500": errors.description,
              })}
            >
              {errors.description ? errors.description.message : "Description"}
            </Label>
            <Textarea
              id="description"
              className={cn({
                "border-red-600 bg-red-200 placeholder:text-slate-600":
                  errors.description,
              })}
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
                minLength: {
                  value: 20,
                  message: "Should contain at least 20 chars",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="ingredients"
              className={cn({
                "text-red-500": errors.ingredients,
              })}
            >
              {errors.ingredients ? errors.ingredients.message : "Ingredients"}
            </Label>
            <Controller
              control={control}
              name="ingredients"
              rules={{
                required: { value: true, message: "Ingredients are required" },
              }}
              render={({ field: { onChange, value } }) => (
                <IngredientsCombobox
                  selectedIngredients={value || []}
                  onSelect={onChange}
                  error={errors.ingredients}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="author"
              className={cn("text-left", {
                "text-red-500": errors.author,
              })}
            >
              {errors.author ? errors.author.message : "Author"}
            </Label>
            <Input
              placeholder="Gordon Ramsay"
              id="author"
              className={cn({
                "border-red-600 bg-red-200 placeholder:text-slate-600":
                  errors.author,
              })}
              {...register("author", {
                required: {
                  value: true,
                  message: "Author is required",
                },
                minLength: {
                  value: 5,
                  message: "Should contain at least 5 chars",
                },
              })}
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
