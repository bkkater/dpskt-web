import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import InputGroup from "../InputGroup";

function InputComponent(
  { name, label, className, styleType, error = null, icon = null, ...rest },
  ref,
) {
  return (
    <InputGroup icon={icon} error={error} label={label} styleType={styleType}>
      <input
        name={name}
        id={name}
        ref={ref}
        className={twMerge(
          "w-full bg-transparent text-[#E1E1E6] outline-none placeholder:text-neutral-500",
          className,
        )}
        autoComplete="off"
        {...rest}
      />
    </InputGroup>
  );
}

const Input = forwardRef(InputComponent);

export default Input;
