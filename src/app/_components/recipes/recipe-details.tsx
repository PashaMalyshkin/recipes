"use client";

import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import { IngredientsList } from "../ingredients/card-ingredients-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { NoRecipes } from "./no-recipes";
import { Loader2 } from "lucide-react";
import { RelatedRecipes } from "./related-recipes";

export const RecipeDetails = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  const [recipe, { isFetching }] = api.recipes.getRecipeById.useSuspenseQuery({
    id: slug ?? "",
  });

  return (
    <>
      {!recipe && <NoRecipes />}
      <div className="h-8 w-8">
        {isFetching && <Loader2 className="m-auto animate-spin text-white" />}
      </div>
      {recipe && (
        <div className="m-auto flex max-w-5xl flex-col gap-4">
          <Card className="min-h-[220px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="truncate leading-8" title={recipe.title}>
                {recipe.title}
              </CardTitle>
              <CardTitle className="!m-0 !mt-0">
                {recipe.categoryTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <CardDescription title={recipe.description}>
                {recipe.description}
              </CardDescription>
              {recipe.ingredientsToRecipes.length > 0 && (
                <IngredientsList ingredients={recipe.ingredientsToRecipes} />
              )}
              <CardTitle className="truncate text-lg leading-8">
                {recipe.author}
              </CardTitle>
            </CardContent>
          </Card>
          {recipe.relatedRecipes.length > 0 && (
            <RelatedRecipes relatedRecipes={recipe.relatedRecipes} />
          )}
        </div>
      )}
    </>
  );
};
