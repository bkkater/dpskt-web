import { useField } from "@unform/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as CheckboxUi from "@radix-ui/react-checkbox";

import { CheckIcon } from "@radix-ui/react-icons";

function Checkbox({ children, name, value, onChange, label, ...props }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [checked, setChecked] = useState(defaultValue === value);

  const handleChange = useCallback(
    (checkedValue) => {
      if (error) {
        clearError();
      }

      setChecked(checkedValue);

      if (onChange) {
        onChange(checkedValue);
      }
    },
    [clearError, error, onChange]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.parentNode.children[1].checked,
      clearValue: () => {
        setChecked(false);
      },
      setValue: (ref, newValue) => {
        setChecked(newValue);
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className="flex align-center mt-7">
      <CheckboxUi.Root
        ref={inputRef}
        id={fieldName}
        value={value}
        checked={checked}
        onCheckedChange={handleChange}
        className="bg-neutral-600 w-4 h-4 flex rounded-sm align-center justify-center shadow"
        {...props}
      >
        <CheckboxUi.Indicator>
          <CheckIcon />
        </CheckboxUi.Indicator>
      </CheckboxUi.Root>

      <label htmlFor={name} className="pl-3 leading-none text-[#e1e1e6]">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
