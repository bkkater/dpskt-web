import React, { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

// Components
import Input from "@/components/Form/Input";

function InputNumber({ className, name, ...rest }) {
  const [number, setNumber] = useState(1);

  const classList = [
    "w-full bg-transparent outline-none placeholder:text-neutral-600 text-center",
  ];

  if (className) {
    classList.push(className);
  }

  return (
    <>
      <button
        onClick={() => setNumber(number === 1 ? 1 : number - 1)}
        type="button"
        disabled={number <= 1}
        className={number <= 1 ? "opacity-30" : ""}
      >
        <Minus />
      </button>

      <Input
        value={number}
        name={name}
        className={classList.join(" ")}
        readOnly
        {...rest}
      />

      <button onClick={() => setNumber(number + 1)} type="button">
        <Plus />
      </button>
    </>
  );
}

export default InputNumber;
