/* eslint-disable indent */
import React from "react";
import { Trash } from "phosphor-react";
import { format } from "date-fns";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Utils
import { dateFormat, getDistance } from "@/utils/date";

// Components
import Button from "@/components/Button";

export default function ClockCardList({ clocks, handleClockDelete }) {
  return (
    <>
      {!!clocks.length &&
        clocks.map(({ startAt, endAt, hash }) => (
          <div
            className="rounded p-8 flex justify-between bg-[#0a0a0a] hover:bg-[#0e0e0e] hover:border-[#6550b9] border-2 border-[#29292E] transition-color"
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

            {/* <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <Button disabled={!endAt}>
                  <Trash size={24} className="ml-auto" />
                </Button>
              </AlertDialog.Trigger>

              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/90" />

                <AlertDialog.Content className="bg-white rounded shadow fixed inset-1/2 w-96 h-96 text-black">
                  <AlertDialog.Title className="AlertDialogTitle">
                    Are you absolutely sure?
                  </AlertDialog.Title>

                  <AlertDialog.Description className="AlertDialogDescription">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialog.Description>

                  <div className="flex gap-6 justify-end">
                    <AlertDialog.Cancel asChild>
                      <button className="Button mauve" type="button">
                        Cancel
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={() => handleClockDelete(hash)}>
                      Yes, delete account
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root> */}
          </div>
        ))}

      {!clocks.length && (
        <p className="text-neutral-500 mt-4">Nenhum registro encontrado</p>
      )}
    </>
  );
}
