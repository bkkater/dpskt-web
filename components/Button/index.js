import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function ButtonComponent({ className, children, ...rest }, ref) {
  return (
    <button
      className={twMerge(
        "flex h-12 w-52 items-center justify-center rounded bg-[#168ac5] font-medium text-[#e1e1e6] shadow transition-transform hover:scale-105",
        className,
      )}
      type="button"
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
}

const Button = forwardRef(ButtonComponent);

export default Button;
