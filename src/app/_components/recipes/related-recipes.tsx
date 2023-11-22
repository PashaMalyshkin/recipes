import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type RelatedRecipes = { id: string; title: string; description: string }[];
export const RelatedRecipes = ({
  relatedRecipes,
}: {
  relatedRecipes: RelatedRecipes;
}) => {
  const router = useRouter();
  const handleNavigate = (id: string) => {
    router.push(`/recipes/${id}`);
  };

  return (
    <>
      <h3 className="text-white">Related Recipes</h3>
      <ul className="flex gap-4">
        {relatedRecipes.map((recipe) => (
          <li
            key={recipe.id}
            className="w-full cursor-pointer duration-300 hover:scale-105"
            onClick={() => handleNavigate(recipe.id)}
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="truncate leading-8">
                  {recipe.title}
                </CardTitle>
                <CardDescription className="truncate">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};
