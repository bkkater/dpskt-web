/* eslint-disable indent */
import React from "react";
import { Trash } from "phosphor-react";
import { format } from "date-fns";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Hooks
import { useClock } from "@/hooks/useClock";

// Utils
import { dateFormat, getDistance } from "@/utils/date";

export default function ClockCard({ clock: { startAt, endAt, hash } }) {
  const { onClockDelete } = useClock();

  return (
    <div
      className="rounded p-8 flex justify-between bg-[#0a0a0a] hover:bg-[#0e0e0e] hover:border-[#286f8d] border-2 border-[#29292E] transition-colors mt-8"
      key={hash}
    >
      <div className="flex flex-col justify-center">
        <span className="font-bold">Entrada</span>

        {format(startAt, dateFormat)}
      </div>

      <div className="flex flex-col justify-center">
        <span className="font-bold">Saída</span>
        {endAt ? format(endAt, dateFormat) : "-"}
      </div>

      <div className="flex flex-col justify-center">
        <span className="font-bold text-center">Tempo Total</span>
        {endAt ? getDistance(startAt, endAt) : "-"}
      </div>

      <AlertDialog.Root>
        <AlertDialog.Trigger disabled={!endAt} className="flex items-center">
          <Trash
            size={24}
            className="ml-auto"
            color={endAt ? "#E1E1E6" : "#A3A3A3"}
          />
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/90" />

          <AlertDialog.Content className="bg-neutral-100 rounded shadow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 h-56 text-black flex flex-col items-start gap-2 p-8">
            <AlertDialog.Title className="text-start text-lg">
              Tem certeza que deseja apagar?
            </AlertDialog.Title>

            <AlertDialog.Description className="text-neutral-500">
              A ação não poderá ser desfeita e seu ponto será deletado
              permanentemente.
            </AlertDialog.Description>

            <div className="flex self-end gap-4 mt-6">
              <AlertDialog.Cancel className="py-2 px-3 bg-[#eae7ec] color-[#65636d] rounded font-medium">
                Cancelar
              </AlertDialog.Cancel>

              <AlertDialog.Action
                onClick={() => onClockDelete(hash)}
                className="bg-[#ffdbdc] py-2 px-3 rounded text-[#ff4d4d] font-medium"
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
