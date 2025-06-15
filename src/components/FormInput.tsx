// components/admin/FormInput.tsx
"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  asChild?: boolean;
  children?: ReactNode;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  asChild = false,
  children,
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {asChild ? (
              children
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}