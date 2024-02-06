import { FC } from "react";
import { InputProps } from "./input.interface";
import { cva } from "class-variance-authority";
import { cn } from "@/utilities/cn";

const inputVariant = cva("px-4 py-3 outline-none", {
  variants: {
    variants: {
      primary: "h-[50px] w-[400px] text-[#9E9E9E] bg-[#F5F5F5] rounded-lg",
    },
  },
});

const Input: FC<InputProps> = ({
  variants,
  className,
  children,
  ...inputProps
}) => {
  return (
    <>
      <input
        className={cn(inputVariant({ variants, className }))}
        {...inputProps}
      />
      {children}
    </>
  );
};

export { Input, inputVariant };
