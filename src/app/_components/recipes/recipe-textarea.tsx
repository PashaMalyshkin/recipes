import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { FC } from "react";
import type { FormValues } from "~/shared/types/form-values";
import type { FieldError, UseFormRegister } from "react-hook-form";

export const RecipeTextarea: FC<{
  placeholder: string;
  label: string;
  fieldName: keyof FormValues;
  error?: FieldError;
  register: UseFormRegister<FormValues>;
}> = ({ error, fieldName, label, placeholder, register }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={fieldName} className={cn(error && "text-red-500")}>
        {error ? error.message : label}
      </Label>
      <Textarea
        placeholder={placeholder}
        id={fieldName}
        className={cn(
          error && "border-red-600 bg-red-200 placeholder:text-slate-600",
        )}
        {...register(fieldName, {
          required: {
            value: true,
            message: `${label} is required`,
          },
          minLength: {
            value: 20,
            message: "Should contain at least 20 chars",
          },
        })}
      />
    </div>
  );
};
