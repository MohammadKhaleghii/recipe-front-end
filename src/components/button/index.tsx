import {FC} from "react";
import {RecipeButtonProps} from "./button.interface";

const RecipeButton: FC<RecipeButtonProps> = ({
  backgroundColor,
  textColor,
  mainText,
  icon,
  backgroundOnHover,
  textOnHover,
  UIType,
  width,
  ...buttonProps
}) => {
  return (
    <>
      {UIType === "primary" ? (
        <button
          className={`px-8 whitespace-nowrap py-3 rounded-lg  transition hover:duration-75 ease-in-out ${width} ${backgroundColor} ${textColor} ${backgroundOnHover} ${textOnHover}`}
          {...buttonProps}
        >
          {icon && icon}
          {mainText}
        </button>
      ) : (
        UIType === "secondary" && (
          <button
            className={`px-8 whitespace-nowrap py-3 rounded-lg  transition hover:duration-75 ease-in-out ${width} border border-red-400   ${backgroundOnHover} ${textOnHover}`}
            {...buttonProps}
          >
            {icon && icon}
            {mainText}
          </button>
        )
      )}
    </>
  );
};

export default RecipeButton;

RecipeButton.defaultProps = {
  backgroundColor: "bg-gradient-to-r from-[#FF7A7A] from to-[#F65900]",
  textColor: "text-white",
  backgroundOnHover:
    "bg-gradient-to-l hover:from-[#F65900]  hover:to-[#FF7A7A]",
  textOnHover: "hover:text-white",
};
