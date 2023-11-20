import { cn } from "~/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { FC } from "react";
import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import type { FormValues } from "~/shared/types/form-values";
import type { InputProps } from "../ui/input";

export const RecipeInput: FC<
  InputProps & {
    placeholder: string;
    label: string;
    fieldName: keyof FormValues;
    error?: FieldError;
    rules?: RegisterOptions<FormValues, keyof FormValues>
    register: UseFormRegister<FormValues>;
  }
> = ({ error, label, register, fieldName, rules, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="author" className={cn(error && "text-red-500")}>
        {error ? error.message : label}
      </Label>
      <Input
        {...props}
        className={cn(
          error && "border-red-600 bg-red-200 placeholder:text-slate-600",
        )}
        {...register(fieldName, rules)}
      />
    </div>
  );
};
