"use client";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { cn } from "~/lib/utils";
import { IngredientsCombobox } from "./ingredients/ingredients-combobox";
import type { FormValues } from "~/shared/types/form-values";
import { RecipeInput } from "./recipes/recipe-input";
import { RecipeTextarea } from "./recipes/recipe-textarea";
import { SelectCategory } from "./select-category";

export const CreateRecipeDialog = () => {
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
          <RecipeInput
            placeholder="Pizza"
            label="Name"
            fieldName="name"
            error={errors.name}
            register={register}
          />

          <RecipeInput
            placeholder="Slug"
            label="Slug"
            fieldName="slug"
            register={register}
            disabled
            value={createSlug(recipeName)}
          />

          <SelectCategory control={control} error={errors.categoryId} />

          <RecipeTextarea
            placeholder="You should do something..."
            error={errors.description}
            register={register}
            label="Description"
            fieldName="description"
          />
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="ingredients"
              className={cn(errors.ingredients && "text-red-500")}
            >
              {errors.ingredients ? errors.ingredients.message : "Ingredients"}
            </Label>
            <Controller
              control={control}
              name="ingredients"
              rules={{
                required: { value: true, message: "Ingredients are required" },
              }}
              render={({ field: { onChange, value = [] } }) => (
                <IngredientsCombobox
                  selectedIngredients={value}
                  onSelect={onChange}
                  error={errors.ingredients}
                />
              )}
            />
          </div>
          <RecipeInput
            placeholder="Gordon Ramsay"
            label="Author"
            fieldName="author"
            register={register}
            error={errors.author}
          />
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
