import {FC} from "react";
import {InputProps} from "./input.interface";

const RecipeInput: FC<InputProps> = ({
  textColor,
  backgroundColor,
  iconClassName,
  width,
  height,
  borderRadius,
  ...inputProps
}) => {
  return (
    <>
      <input
        className={`${height} ${width} ${textColor} ${backgroundColor}  ${borderRadius} px-4 py-3 outline-none`}
        {...inputProps}
      />
      {/* <i className={`absolute left-0 `}>a</i> */}
    </>
  );
};

export default RecipeInput;
RecipeInput.defaultProps = {
  height: "h-[50px]",
  width: "w-[400px]",
  textColor: "text-[#9E9E9E]",
  backgroundColor: "bg-[#F5F5F5]",
  borderRadius: "rounded-lg",
};
