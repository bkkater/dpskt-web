import React, { forwardRef, useState } from "react";
import * as CheckboxUi from "@radix-ui/react-checkbox";
import { Check } from "@phosphor-icons/react";

function CheckboxComponent(
  { name, label, className, checked = false, ...rest },
  ref
) {
  const [isChecked, setChecked] = useState(checked);

  return (
    <div className="flex align-center mt-7">
      <CheckboxUi.Root
        name={name}
        ref={ref}
        id={label}
        checked={isChecked}
        onCheckedChange={setChecked}
        className="bg-neutral-600 w-4 h-4 flex rounded-sm align-center justify-center shadow"
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
