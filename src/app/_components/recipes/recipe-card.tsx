import type { RouterOutputs } from "~/server/api/root";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IngredientsList } from "../ingredients/card-ingredients-list";

export const RecipeCard: React.FC<{
  recipe: RouterOutputs["recipes"]["getAllRecipes"][number];
}> = ({ recipe }) => {
  return (
    <li className="cursor-pointer duration-300 hover:scale-105">
      <Card className="h-full min-h-[300px]">
        <CardHeader>
          <CardTitle className="truncate" title={recipe.title}>
            {recipe.title}
          </CardTitle>
          <CardDescription className="truncate" title={recipe.description}>
            {recipe.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recipe.ingredientsToRecipes.length > 0 && (
            <IngredientsList ingredients={recipe.ingredientsToRecipes} />
          )}
        </CardContent>
      </Card>
    </li>
  );
};
