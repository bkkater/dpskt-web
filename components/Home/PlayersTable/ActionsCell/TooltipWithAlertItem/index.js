import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

function TooltipWithAlertItem({
  icon: Icon,
  label,
  onClick,
  title,
  description,
  buttonLabel,
}) {
  return (
    <Tooltip.Root>
      <AlertDialog.Root>
        <Tooltip.Trigger className="flex align-center justify-center" asChild>
          <AlertDialog.Trigger>
            <Icon size={20} />
          </AlertDialog.Trigger>
        </Tooltip.Trigger>

        <Tooltip.Content
          className="rounded p-2 bg-[#202024] shadow text-neutral-300"
          sideOffset={5}
        >
          {label}
          <Tooltip.Arrow className="fill-[#202024]" />
        </Tooltip.Content>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/90" />

          <AlertDialog.Content className="bg-neutral-100 rounded shadow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 h-56 text-black flex flex-col items-start gap-2 p-8">
            <AlertDialog.Title className="text-start text-lg">
              {title}
            </AlertDialog.Title>

            <AlertDialog.Description className="text-neutral-500">
              {description}
            </AlertDialog.Description>

            <div className="flex self-end gap-4 mt-6">
              <AlertDialog.Cancel className="py-2 px-3 bg-[#eae7ec] color-[#65636d] rounded font-medium">
                Cancelar
              </AlertDialog.Cancel>

              <AlertDialog.Action
                onClick={onClick}
                className="bg-[#ffdbdc] py-2 px-3 rounded text-[#ff4d4d] font-medium"
              >
                {buttonLabel}
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Tooltip.Root>
  );
}

export default TooltipWithAlertItem;
