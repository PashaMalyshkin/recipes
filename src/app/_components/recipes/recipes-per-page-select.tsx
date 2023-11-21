"use client";

import {
  usePaginationActions,
  usePaginationLimit,
} from "~/shared/store/pagination-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/ui/select";

export const RecipesPerPageSelect = () => {
  const limit = usePaginationLimit();
  const { setLimit } = usePaginationActions();

  console.log(limit);
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
