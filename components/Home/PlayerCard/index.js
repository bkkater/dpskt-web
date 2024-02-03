import React from "react";
import Image from "next/image";
import { Clipboard } from "@phosphor-icons/react";

// Hooks
import { useClock } from "@/hooks/useClock";
import { useUser } from "@/hooks/useUser";

// Resources
import DPLogo from "@/resources/dpskt.png";
import GOTLogo from "@/resources/got.png";

// Config
import { CORPORATION_OPTIONS } from "@/config/general";

// Components
import Button from "@/components/Button";

export default function PlayerCard() {
  const { onClockAction } = useClock();
  const { user } = useUser();

  const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

  if (user.player.statusClock) {
    iconClassName.push("bg-[#2D8F60]");
  } else {
    iconClassName.push("bg-[#A12525]");
  }

  return (
    <div className="bg-[#202024] bg-[url('../resources/bg-texture.png')] w-full rounded p-8 flex gap-16 border-2 border-[#29292E]">
      <Image
        src={
          user.player.corporation === CORPORATION_OPTIONS[2].label
            ? GOTLogo
            : DPLogo
        }
        width={120}
        alt="DPSKT"
        priority
      />

      <div className="flex flex-col text-center justify-center">
        <span className="font-bold">{user.player.role}</span>
        {`${user?.player.id} ${user.player.name}`}
      </div>

      <Button
        className="bg-[#121214] font-medium py-2 px-12 h-12 my-auto hover:bg-[#0a0a0a] transition-colors"
        onClick={() => onClockAction(user)}
      >
        <Clipboard size={20} className="mr-2" />
        {user.player.statusClock ? "Fechar Ponto" : "Abrir Ponto"}
      </Button>

      <div className="flex self-center align-center justify-end flex-1 gap-2">
        <div className={iconClassName.join(" ")} />
        {user.player.statusClock ? "Em serviço" : "Fora de serviço"}
      </div>
    </div>
  );
}
