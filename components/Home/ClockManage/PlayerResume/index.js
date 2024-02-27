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
    <div className="w-72 bg-[#0a0a0a] rounded py-8 flex-col flex gap-px border-2 border-[#29292E] mt-8 text-center h-min">
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
      <span className="text-neutral-400">{`${player.id} ${player.name}`}</span>

      <span className="mt-6 font-bold">Recrutamento</span>
      <span className="text-neutral-400">
        {format(player.joinedAt, "dd MMM yy")}
      </span>

      <span className="mt-6 font-bold">Tempo total em serviço</span>
      <span className="text-neutral-400">
        {totalMinutes > 0 ? formatDistinct(totalMinutes) : "N/A"}
      </span>
    </div>
  );
}

export default PlayerResume;
