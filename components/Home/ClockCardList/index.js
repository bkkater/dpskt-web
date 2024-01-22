/* eslint-disable indent */
import React from "react";
import * as Toast from "@radix-ui/react-toast";
import { Trash } from "phosphor-react";
import { format } from "date-fns";

// Utils
import getDistance from "@/utils/getDistance";

// Components
import Button from "@/components/Button";
import Loading from "@/components/Loading";

export default function ClockCardList({
  isLoading,
  clocks,
  handleClockDelete,
}) {
  return (
    <>
      {!isLoading &&
        !!clocks.length &&
        clocks.map(({ _id, startAt, endAt }, index) => {
          const formattedDates = {
            start: format(startAt, "HH:mm · dd MMM yy"),
            end: endAt ? format(endAt, "HH:mm · dd MMM yy") : "-",
            duration: endAt ? getDistance(startAt, endAt) : "-",
          };

          return (
            <div
              className="rounded p-8 flex justify-between bg-[#0a0a0a] hover:bg-[#0e0e0e] hover:border-[#6550b9] border-2 border-[#29292E] transition-color"
              key={_id}
            >
              <div className="flex flex-col justify-center">
                <span className="font-bold">Entrada</span>

                {formattedDates.start}
              </div>

              <div className="flex flex-col justify-center">
                <span className="font-bold">Saída</span>
                {formattedDates.end}
              </div>

              <div className="flex flex-col justify-center">
                <span className="font-bold text-center">Tempo Total</span>
                {formattedDates.duration}
              </div>

              <Button onClick={() => handleClockDelete(index)}>
                <Trash size={24} className="ml-auto" />
              </Button>
            </div>
          );
        })}

      {isLoading && <Loading />}

      {!isLoading && !clocks.length && (
        <p className="text-neutral-500 mt-4">Nenhum registro encontrado</p>
      )}
    </>
  );
}
