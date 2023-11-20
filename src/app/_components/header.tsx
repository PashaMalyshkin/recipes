import Link from "next/link";
import { Croissant } from "lucide-react";
import { CreateRecipeDialog } from "./create-recipe-dialog";

export const Header = () => {
  return (
    <header className="flex items-center justify-between pt-4 text-white">
      <Link href="/" className="block duration-300 hover:scale-110">
        <Croissant className="h-12 w-12" />
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/recipes" className="hover:underline">
          All Recipes
        </Link>
        <CreateRecipeDialog />
      </nav>
    </header>
  );
};
