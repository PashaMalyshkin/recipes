import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { RelatedRecipes } from "./related-recipes";

export const RelatedRecipeCard = ({
  relatedRecipe,
}: {
  relatedRecipe: RelatedRecipes[number];
}) => {
  const router = useRouter();
  const handleNavigate = (id: string) => {
    router.push(`/recipes/${id}`);
  };
  return (
    <li
      key={relatedRecipe.id}
      className="w-full cursor-pointer duration-300 hover:scale-105"
      onClick={() => handleNavigate(relatedRecipe.id)}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="truncate leading-8">
            {relatedRecipe.title}
          </CardTitle>
          <CardDescription className="truncate">
            {relatedRecipe.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </li>
  );
};
