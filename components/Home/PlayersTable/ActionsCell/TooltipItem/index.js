import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function TooltipItem({ onClick, icon: Icon, label, iconColor }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        onClick={onClick}
        className="flex align-center justify-center outline-none"
      >
        <Icon size={20} color={iconColor || "#E1E1E6"} />
      </Tooltip.Trigger>

      <Tooltip.Content
        className="rounded p-2 bg-[#202024] shadow text-neutral-300"
        sideOffset={5}
      >
        {label}
        <Tooltip.Arrow className="fill-[#202024]" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export default TooltipItem;
