import { Ban } from "lucide-react";

export const NoRecipes = () => {
  return (
    <div className="m-auto flex w-fit flex-col items-center gap-2">
      <Ban color="#fff" />
      <h1 className="text-lg text-white">No Recipes yet</h1>
    </div>
  );
};
