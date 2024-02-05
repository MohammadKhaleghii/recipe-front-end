import {ButtonHTMLAttributes, ReactNode} from "react";

export interface RecipeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  UIType: "primary" | "secondary";
  backgroundColor?: string;
  width?: string;
  backgroundOnHover?: string;
  textOnHover?: string;
  textColor?: string;
  mainText: string;
  icon?: ReactNode;
}
