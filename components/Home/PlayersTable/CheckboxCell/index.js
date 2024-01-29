import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

function CheckboxCell({ getValue }) {
  return (
    <Checkbox.Root
      defaultChecked={getValue()}
      className="ml-3 bg-neutral-700 w-4 h-4 flex rounded-sm align-center justify-center shadow"
      disabled
    >
      <Checkbox.Indicator color="white">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

export default CheckboxCell;