import Link from "next/link";
import { CreateRecipeDialog } from "./create-recipe-dialog";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 text-white">
      <h2 className="text-4xl font-semibold">Recipes</h2>
      <nav className="flex items-center gap-6">
        <Link href="/recipes" className="hover:underline">
          All Recipes
        </Link>
        <CreateRecipeDialog />
      </nav>
    </header>
  );
};
