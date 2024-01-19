import React from "react";

function Button({ className, children, ...rest }) {
  const classList = ["flex items-center justify-center rounded text-white"];

  if (className) {
    classList.push(className);
  }

  return (
    <button className={classList.join(" ")} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
