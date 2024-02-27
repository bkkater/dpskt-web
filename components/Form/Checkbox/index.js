import React, { forwardRef, useState } from "react";
import * as CheckboxUi from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

function CheckboxComponent({ name, label, checked = false, ...rest }, ref) {
  const [isChecked, setChecked] = useState(checked);

  return (
    <div className="mt-7 flex items-center">
      <CheckboxUi.Root
        name={name}
        ref={ref}
        id={label}
        checked={isChecked}
        onCheckedChange={setChecked}
        className="flex h-4 w-4 items-center justify-center rounded-sm bg-neutral-600 shadow"
        {...rest}
      >
        <CheckboxUi.Indicator>
          <Check />
        </CheckboxUi.Indicator>
      </CheckboxUi.Root>

      <label htmlFor={name} className="pl-3 leading-none text-[#e1e1e6]">
        {label}
      </label>
    </div>
  );
}

const Checkbox = forwardRef(CheckboxComponent);

export default Checkbox;
