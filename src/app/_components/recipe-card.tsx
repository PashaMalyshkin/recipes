import type { RouterOutputs } from "~/server/api/root";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IngredientsList } from "./ingredients-list";

export const RecipeCard: React.FC<{
  recipe: RouterOutputs["recipes"]["getAllRecipes"][number];
}> = ({ recipe }) => {
  return (
    <li className="cursor-pointer duration-300 hover:scale-105">
      <Card className="min-h-[300px]">
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <IngredientsList ingredients={recipe.ingredientsToRecipes} />
        </CardContent>
      </Card>
    </li>
  );
};
