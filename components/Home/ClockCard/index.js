/* eslint-disable indent */
import React, { useCallback } from "react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Hooks
import { useClock } from "@/hooks/useClock";

// Utils
import { dateFormat, getDistance } from "@/utils/date";
import { Divider } from "antd";
import Button from "@/components/Button";

export default function ClockCard({
  clock: { startAt, endAt, hash },
  onDelete,
}) {
  const { onClockDelete } = useClock();

  const handleClockDelete = useCallback(() => {
    onClockDelete(hash);

    if (onDelete) {
      onDelete(hash);
    }
  }, [hash, onClockDelete, onDelete]);

  return (
    <div className="relative grid grid-cols-1 justify-between gap-4 rounded border-2 border-[#29292E] bg-[#0a0a0a] p-6 pb-4 transition-colors hover:border-[#168ac5] hover:bg-[#0e0e0e] sm:flex sm:grid-cols-2 sm:gap-0 md:py-8">
      <div className="flex justify-between sm:flex-col sm:justify-center">
        <span className="font-bold">Entrada</span>

        {format(startAt, dateFormat)}
      </div>

      <div className="flex justify-between sm:flex-col sm:justify-center">
        <span className="font-bold">Saída</span>
        {endAt ? format(endAt, dateFormat) : "-"}
      </div>

      <div className="flex justify-between sm:flex-col sm:justify-center">
        <span className="font-bold">Tempo Total</span>
        {endAt ? getDistance(startAt, endAt) : "-"}
      </div>

      <Divider className="my-0 w-full border-[#1e1e22] sm:hidden" />

      <AlertDialog.Root>
        <AlertDialog.Trigger className="flex items-center" asChild>
          <Button
            className="w-auto bg-transparent p-2 shadow-none enabled:hover:bg-neutral-800"
            disabled={!endAt}
          >
            <Trash2
              size={22}
              className="mx-auto sm:ml-auto"
              color={endAt ? "#E1E1E6" : "#29292E"}
            />
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/90" />

          <AlertDialog.Content className="fixed top-1/2 left-1/2 flex h-56 w-100 -translate-x-1/2 -translate-y-1/2 transform flex-col items-start gap-2 rounded bg-neutral-100 p-8 text-black shadow">
            <AlertDialog.Title className="text-bold text-xl">
              Tem certeza que deseja apagar?
            </AlertDialog.Title>

            <AlertDialog.Description className="text-neutral-500">
              A ação não poderá ser desfeita e seu ponto será deletado
              permanentemente.
            </AlertDialog.Description>

            <div className="mt-6 flex gap-4 self-end">
              <AlertDialog.Cancel className="color-[#65636d] rounded bg-[#eae7ec] py-2 px-3 font-medium transition-colors hover:bg-[#dbd9dd]">
                Cancelar
              </AlertDialog.Cancel>

              <AlertDialog.Action
                onClick={handleClockDelete}
                className="rounded bg-[#ffdbdc] py-2 px-3 font-medium text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-[#ffdbdc]"
              >
                Sim, deletar ponto
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
