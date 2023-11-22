"use client";

import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IngredientsCombobox } from "../ingredients/ingredients-combobox";
import type { FormValues } from "~/shared/types/form-values";
import { RecipeInput } from "./recipe-input";
import { RecipeTextarea } from "./recipe-textarea";
import { SelectCategory } from "../categories/select-category";

export const validationRules = {
  name: {
    required: "Name is required",
    minLength: {
      value: 5,
      message: "Should contain at least 5 chars",
    },
    maxLength: {
      value: 30,
      message: "Should contain max 30 chars",
    },
    pattern: {
      value: /^[^\u0400-\u04FF]*$/,
      message: "Do NOT use Cyrillic chars",
    },
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 20,
      message: "Should contain at least 20 chars",
    },
    pattern: {
      value: /^[^\u0400-\u04FF]*$/,
      message: "Do NOT use Cyrillic chars",
    },
  },
  author: {
    required: "Author is required",
    minLength: {
      value: 5,
      message: "Should contain at least 5 chars",
    },
    maxLength: {
      value: 30,
      message: "Should contain max 30 chars",
    },
    pattern: {
      value: /^[^\u0400-\u04FF]*$/,
      message: "Do NOT use Cyrillic chars",
    },
  },
};

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
    onSuccess: async () => {
      await utils.recipes.getAllRecipes.invalidate();
      await utils.recipes.getLastRecipes.invalidate();
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
      <DialogContent className="h-[558px]">
        <DialogHeader>
          <DialogTitle>Add Recipe</DialogTitle>
        </DialogHeader>
        <form
          id="addRecipeForm"
          className="grid h-[418px] grid-cols-2 grid-rows-[120px_minmax(100px,_1fr)_100px] gap-4 py-4"
          onSubmit={handleSubmit(onAddRecipe)}
        >
          <RecipeInput
            placeholder="Pizza"
            label="Name"
            fieldName="name"
            error={errors.name}
            rules={validationRules.name}
            register={register}
          />

          <RecipeInput
            placeholder="Slug"
            label="Slug"
            fieldName="slug"
            register={register}
            disabled
            required={false}
            value={createSlug(recipeName)}
          />

          <SelectCategory control={control} error={errors.categoryId} />

          <RecipeTextarea
            placeholder="You should do something..."
            error={errors.description}
            register={register}
            label="Description"
            fieldName="description"
            rules={validationRules.description}
          />

          <IngredientsCombobox error={errors.ingredients} control={control} />

          <RecipeInput
            placeholder="Gordon Ramsay"
            label="Author"
            fieldName="author"
            register={register}
            rules={validationRules.author}
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
