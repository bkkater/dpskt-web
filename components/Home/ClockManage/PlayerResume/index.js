import Image from "next/image";
import React from "react";

// Resources
import DPLogo from "@/resources/dpskt.png";
import GOTLogo from "@/resources/got.png";

// Config
import { CORPORATION_OPTIONS } from "@/config/general";
import { format, formatDistanceStrict } from "date-fns";

// Utils
import { formatDistinct } from "@/utils/date";

function PlayerResume({ player, clocks }) {
  const totalMinutes = clocks.reduce((acc, clock) => {
    if (clock.endAt) {
      const elapsedMinutes = formatDistanceStrict(clock.startAt, clock.endAt, {
        unit: "minute",
      }).split(" ")[0];

      return acc + Number(elapsedMinutes);
    }

    return acc;
  }, 0);

  return (
    <div className="bg-[#202024] w-80 max-w-80 rounded py-8 flex-col flex gap-px border border-[#286f8d] mt-8 text-center h-min">
      <Image
        className="self-center mb-6"
        src={
          player.corporation === CORPORATION_OPTIONS[2].label ? GOTLogo : DPLogo
        }
        width={100}
        alt="DPSKT"
        priority
      />
      <span className="font-bold">{player.role}</span>
      <span>{`${player.id} ${player.name}`}</span>
      <span className="mt-6 font-bold">Recrutamento</span>
      {format(player.joinedAt, "dd MMM yy")}

      <span className="mt-6 font-bold">Tempo total em serviço</span>
      <span>{formatDistinct(totalMinutes)}</span>
    </div>
  );
}

export default PlayerResume;
