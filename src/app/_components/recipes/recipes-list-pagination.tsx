import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRecipesActions } from "~/shared/store/recipes-store";

export const RecipesListPagination = ({
  isFirstPage,
  isLastPage,
}: {
  isFirstPage: boolean;
  isLastPage: boolean;
}) => {
  const { increaseOffset, decreaseOffset } = useRecipesActions();

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        className="bg-white text-black duration-300 hover:bg-slate-800 hover:text-white"
        onClick={decreaseOffset}
        disabled={isFirstPage}
      >
        <ArrowLeft />
      </Button>
      <Button
        className="bg-white text-black duration-300 hover:bg-slate-800 hover:text-white"
        onClick={increaseOffset}
        disabled={isLastPage}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
