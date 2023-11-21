import type { RouterOutputs } from "~/server/api/root";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IngredientsList } from "../ingredients/card-ingredients-list";
import { useRouter } from "next/navigation";

export const RecipeCard: React.FC<{
  recipe: RouterOutputs["recipes"]["getLastRecipes"][number];
}> = ({ recipe }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <li
      className="cursor-pointer duration-300 hover:scale-105"
      onClick={handleNavigate}
    >
      <Card className="h-full min-h-[300px]">
        <CardHeader>
          <CardTitle className="truncate leading-8" title={recipe.title}>
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
