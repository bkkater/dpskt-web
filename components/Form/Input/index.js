import React, { forwardRef } from "react";
import InputGroup from "../InputGroup";

function InputComponent(
  { name, label, className, styleType, error = null, icon = null, ...rest },
  ref
) {
  const classList = [
    "w-full bg-transparent outline-none placeholder:text-neutral-500 text-[#E1E1E6]",
  ];

  if (className) {
    classList.push(className);
  }

  return (
    <InputGroup icon={icon} error={error} label={label} styleType={styleType}>
      <input
        name={name}
        id={name}
        ref={ref}
        className={classList.join(" ")}
        autoComplete="off"
        {...rest}
      />
    </InputGroup>
  );
}

const Input = forwardRef(InputComponent);

export default Input;
