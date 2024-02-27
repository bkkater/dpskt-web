import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function TooltipItem({ onClick, icon: Icon, label, iconColor }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        onClick={onClick}
        className="flex items-center justify-center outline-none"
      >
        <Icon size={20} color={iconColor || "#E1E1E6"} />
      </Tooltip.Trigger>

      <Tooltip.Content
        className="rounded bg-[#202024] p-2 text-neutral-300 shadow"
        sideOffset={5}
      >
        {label}
        <Tooltip.Arrow className="fill-[#202024]" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export default TooltipItem;
