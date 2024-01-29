import React from "react";

const STYLE_TYPES = {
  dark: "bg-neutral-800",
  darken: "bg-[#121214]",
};

function InputGroup({
  icon: Icon,
  label,
  className,
  error,
  children,
  styleType = "darken",
}) {
  const divClassList = ["flex flex-col mb-5 last-of-type:mb-0"];

  const containerClassList = [
    "rounded h-12 flex items-center px-3 border-2 focus-within:border-[#084551] focus-within:ease-in  focus-within:duration-300 gap-2",
  ];

  if (className) {
    divClassList.push(className);
  }

  if (error) {
    containerClassList.push("border-rose-500");
  } else {
    containerClassList.push("border-transparent");
  }

  containerClassList.push(STYLE_TYPES[styleType]);

  return (
    <div className={divClassList.join(" ")}>
      <div className={containerClassList.join(" ")}>
        {Icon && <Icon size={24} color="#7C7C8A" />}
        {children}
      </div>

      {error && (
        <p className="text-rose-500 normal-case">
          {label
            ? `O campo ${label} é obrigatório.`
            : "Este campo é obrigatório"}
        </p>
      )}
    </div>
  );
}

export default InputGroup;
