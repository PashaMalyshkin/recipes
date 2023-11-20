import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { FC } from "react";
import type { FormValues } from "~/shared/types/form-values";
import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export const RecipeTextarea: FC<{
  placeholder: string;
  label: string;
  fieldName: keyof FormValues;
  error?: FieldError;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
  register: UseFormRegister<FormValues>;
}> = ({ error, fieldName, label, placeholder, register, rules }) => {
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
        {...register(fieldName, rules)}
      />
    </div>
  );
};
