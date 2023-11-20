import type { TIngredients } from "./ingredients";

export type FormValues = {
    name: string;
    categoryId: string;
    slug: string;
    description: string;
    author: string;
    ingredients: TIngredients;
  };