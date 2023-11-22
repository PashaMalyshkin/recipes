import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  useRecipesActions,
  useRecipesPaginationOffset,
} from "~/shared/store/recipes-store";

export const RecipesListPagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const { increaseOffset, decreaseOffset } = useRecipesActions();
  const offset = useRecipesPaginationOffset();

  const isLastPage = currentPage >= totalPages;
  const isFirstPage = offset === 0;
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        className="bg-white text-black duration-300 hover:bg-slate-800 hover:text-white"
        onClick={decreaseOffset}
        disabled={isFirstPage}
      >
        <ArrowLeft />
      </Button>
      <div className="w-fit text-white">
        Page {currentPage} of {totalPages}
      </div>
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
