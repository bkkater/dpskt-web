import React, { forwardRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as SelectUI from "@radix-ui/react-select";

import InputGroup from "../InputGroup";

function SelectComponent(
  {
    value,
    onChange,
    options,
    label,
    styleType,
    className = null,
    error = null,
    icon = null,
    children,
    ...rest
  },
  ref
) {
  return (
    <SelectUI.Root value={value} onValueChange={onChange} {...rest}>
      <InputGroup
        label={label}
        icon={icon}
        error={error}
        styleType={styleType}
        className={className}
      >
        <SelectUI.Trigger
          aria-label={label}
          ref={ref}
          className="inline-flex items-center justify-between w-full outline-none data-[placeholder]:text-neutral-500"
        >
          <SelectUI.Value placeholder={label} />

          <SelectUI.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectUI.Icon>
        </SelectUI.Trigger>
      </InputGroup>

      <SelectUI.Content
        className="shadow bg-[#121214] rounded-b w-80 bottom-0 -translate-x-[43px]"
        position="popper"
        sideOffset={12}
      >
        <SelectUI.ScrollUpButton className="flex items-center justify-center">
          <ChevronUpIcon />
        </SelectUI.ScrollUpButton>

        <ScrollArea.Root className="w-full max-h-48" type="auto">
          <SelectUI.Viewport className="shadow-lg max-h-48">
            <ScrollArea.Viewport className="w-full h-full">
              {children}
            </ScrollArea.Viewport>
          </SelectUI.Viewport>
        </ScrollArea.Root>

        <SelectUI.ScrollDownButton className="flex items-center justify-center text-gray-300">
          <ChevronDownIcon />
        </SelectUI.ScrollDownButton>
      </SelectUI.Content>
    </SelectUI.Root>
  );
}

const Select = forwardRef(SelectComponent);

export default Select;
