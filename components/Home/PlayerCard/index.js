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
import Loading from "@/components/Loading";

export default function PlayerCard() {
  const { onClockAction } = useClock();
  const { user } = useUser();

  const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

  if (!user) {
    return <Loading />;
  }

  if (user?.player.statusClock) {
    iconClassName.push("bg-[#2D8F60]");
  } else {
    iconClassName.push("bg-[#A12525]");
  }

  return (
    <div className="bg-[#202024] bg-[url('../resources/bg-texture.png')] w-full rounded md:px-8 px-4 py-8  flex flex-col border-2 border-[#29292E] relative md:gap-16 md:justify-normal sm:justify-between sm:flex-row gap-6">
      {user && (
        <>
          <Image
            src={
              user.player.corporation === CORPORATION_OPTIONS[2].label
                ? GOTLogo
                : DPLogo
            }
            width={120}
            alt="DPSKT"
            priority
            className="self-center"
          />

          <div className="flex sm:flex-col gap-2 justify-center">
            <span className="font-bold">{user.player.role}</span>
            {`${user?.player.id} ${user.player.name}`}
          </div>

          <Button
            className="bg-[#121214] font-medium py-2 h-12 my-auto hover:bg-[#0a0a0a] transition-colors px-4 md:px-12 w-full  w-max-20 sm:w-auto "
            onClick={() => onClockAction(user)}
          >
            <Clipboard size={20} className="mr-2" />
            {user.player.statusClock ? "Fechar Ponto" : "Abrir Ponto"}
          </Button>

          <div className="lg:flex-1 lg:static flex self-center align-center justify-end  absolute top-5 right-5 gap-2">
            <div className={iconClassName.join(" ")} />
            {user.player.statusClock ? "Em serviço" : "Fora de serviço"}
          </div>
        </>
      )}

      {!user && <Loading className="mx-auto" />}
    </div>
  );
}
