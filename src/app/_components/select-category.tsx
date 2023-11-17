import { Controller } from "react-hook-form";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { FC } from "react";
import type { Control, FieldError } from "react-hook-form";
import type { FormValues } from "~/shared/types/form-values";

export const SelectCategory: FC<{
  control: Control<FormValues>;
  error?: FieldError;
}> = ({ control, error }) => {
  const {
    data: categories,
    isLoading,
    isFetching,
  } = api.categories.getCategories.useQuery();
  const isCategoriesLoading = isLoading || isFetching;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="category" className={cn(error && "text-red-500")}>
        {error ? error.message : "Category"}
      </Label>
      <Controller
        control={control}
        name="categoryId"
        rules={{
          required: {
            value: true,
            message: "Category is required",
          },
        }}
        render={({ field: { onChange } }) => (
          <Select onValueChange={onChange}>
            <SelectTrigger
              id="categoryId"
              className={cn(
                error && "border-red-600 bg-red-200 placeholder:text-slate-600",
              )}
            >
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {isCategoriesLoading ? (
                <Loader2 className="m-auto animate-spin" />
              ) : (
                <>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="cursor-pointer"
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};
