import React from "react";

function InputGroup({
  leftIcon: LeftIcon,
  label,
  className,
  children,
  containerClassName,
  hideLabel,
  error,
}) {
  const divClassList = ["flex flex-col mb-5 last-of-type:mb-0"];
  const containerClassList = [
    "rounded bg-[#121214] h-12 flex items-center px-3 border-2 focus-within:border-[#565a85] focus-within:ease-in  focus-within:duration-300",
  ];

  if (className) {
    divClassList.push(className);
  }

  if (containerClassName) {
    containerClassList.push(containerClassName);
  }

  if (error) {
    containerClassList.push("border-rose-500");
  } else {
    containerClassList.push("border-transparent");
  }

  return (
    <div className={divClassList.join(" ")}>
      {!hideLabel && label && <span className="mb-2 text-md">{label}</span>}

      <div className={containerClassList.join(" ")}>
        {LeftIcon && <LeftIcon size={24} color="#7C7C8A" className="mr-2" />}
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
