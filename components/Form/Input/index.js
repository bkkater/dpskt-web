import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";

function Input({ className, name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  const classList = [
    "w-full bg-transparent outline-none placeholder:text-neutral-600",
  ];

  if (className) {
    classList.push(className);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} className={classList.join(" ")} {...rest} />;
}

export default Input;
