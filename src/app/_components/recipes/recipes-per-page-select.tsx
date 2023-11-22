"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/ui/select";
import {
  useRecipesActions,
  useRecipesPaginationLimit,
} from "~/shared/store/recipes-store";

export const RecipesPerPageSelect = () => {
  const limit = useRecipesPaginationLimit();
  const { setLimit } = useRecipesActions();

  return (
    <Select onValueChange={setLimit} value={limit.toString()}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Recipes Per Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="5" className="cursor-pointer">
            5 Recipes
          </SelectItem>
          <SelectItem value="10" className="cursor-pointer">
            10 Recipes
          </SelectItem>
          <SelectItem value="15" className="cursor-pointer">
            15 Recipes
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
