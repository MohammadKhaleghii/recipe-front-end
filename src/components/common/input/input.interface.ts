import { InputHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { inputVariant } from ".";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {}
