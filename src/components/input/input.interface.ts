import {HTMLAttributes, InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textColor?: string;
  backgroundColor?: string;
  iconClassName?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}
