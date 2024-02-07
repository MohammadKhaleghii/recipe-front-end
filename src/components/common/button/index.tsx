import { FC } from "react";
import { ButtonProps } from "./button.interface";
import { cva } from "class-variance-authority";
import { cn } from "@/utilities/cn";

const buttonVariant = cva(
  "px-8 whitespace-nowrap py-3 rounded-lg  transition hover:duration-75 ease-in-out w-full ",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#FF7A7A] from to-[#F65900] text-white bg-gradient-to-l hover:from-[#F65900]  hover:to-[#FF7A7A] hover:text-white",
        secondary: "border border-red-400",
      },
    },
  },
);

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  ...buttonProps
}) => {
  return (
    <button
      className={cn(buttonVariant({ variant, className }))}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export { Button, buttonVariant };
