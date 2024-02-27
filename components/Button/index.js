import React from "react";
import { twMerge } from "tailwind-merge";

function Button({ className, children, ...rest }) {
  return (
    <button
      className={twMerge(
        "flex h-12 w-52 items-center justify-center rounded bg-[#168ac5] font-medium text-[#e1e1e6] shadow transition-transform hover:scale-105",
        className,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
