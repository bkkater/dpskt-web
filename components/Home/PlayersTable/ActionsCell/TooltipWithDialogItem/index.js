import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Dialog from "@radix-ui/react-dialog";

function TooltipWithDialogItem({
  label,
  children,
  open,
  onOpenChange,
  icon: Icon,
}) {
  return (
    <Tooltip.Root>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Tooltip.Trigger className="flex items-center justify-center" asChild>
          <Dialog.Trigger>
            <Icon size={20} />
          </Dialog.Trigger>
        </Tooltip.Trigger>

        <Tooltip.Content
          className="rounded bg-[#202024] p-2 text-neutral-300 shadow"
          sideOffset={5}
        >
          {label}
          <Tooltip.Arrow className="fill-[#202024]" />
        </Tooltip.Content>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90" />

          {children}
        </Dialog.Portal>
      </Dialog.Root>
    </Tooltip.Root>
  );
}

export default TooltipWithDialogItem;
