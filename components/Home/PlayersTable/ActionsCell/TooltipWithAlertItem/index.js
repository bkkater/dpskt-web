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
        <Tooltip.Trigger className="flex items-center justify-center" asChild>
          <AlertDialog.Trigger>
            <Icon size={20} />
          </AlertDialog.Trigger>
        </Tooltip.Trigger>

        <Tooltip.Content
          className="rounded bg-[#202024] p-2 text-neutral-300 shadow"
          sideOffset={5}
        >
          {label}
          <Tooltip.Arrow className="fill-[#202024]" />
        </Tooltip.Content>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/90" />

          <AlertDialog.Content className="fixed top-1/2 left-1/2 flex h-56 w-100 -translate-x-1/2 -translate-y-1/2 transform flex-col items-start gap-2 rounded bg-neutral-100 p-8 text-black shadow">
            <AlertDialog.Title className="text-start text-lg">
              {title}
            </AlertDialog.Title>

            <AlertDialog.Description className="text-neutral-500">
              {description}
            </AlertDialog.Description>

            <div className="mt-6 flex gap-4 self-end">
              <AlertDialog.Cancel className="color-[#65636d] rounded bg-[#eae7ec] py-2 px-3 font-medium">
                Cancelar
              </AlertDialog.Cancel>

              <AlertDialog.Action
                onClick={onClick}
                className="rounded bg-[#ffdbdc] py-2 px-3 font-medium text-[#ff4d4d]"
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
