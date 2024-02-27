import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

function CheckboxCell({ getValue }) {
  return (
    <Checkbox.Root
      defaultChecked={getValue()}
      className="ml-3 flex h-4 w-4 items-center justify-center rounded-sm bg-neutral-700 shadow"
      disabled
    >
      <Checkbox.Indicator color="white">
        <Check />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

export default CheckboxCell;
