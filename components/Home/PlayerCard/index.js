import React from "react";
import Image from "next/image";
import { Clipboard, Power } from "lucide-react";

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
  const { onClockAction, isLoading } = useClock();
  const { user } = useUser();

  const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

  if (!user) {
    return <Loading />;
  }

  if (user?.player.statusClock) {
    iconClassName.push("bg-[#2D8F60]");
  } else {
    iconClassName.push("bg-[#dd2323]");
  }

  return (
    <div className="md:justify-normal bg-texture relative flex w-full animate-fromLeft flex-col gap-6 rounded border-2 border-[#29292E] bg-[#202024] bg-cover px-4 py-8 sm:flex-row sm:justify-between md:gap-16 md:px-8">
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
            className="mt-5 self-center md:mt-0"
          />

          <div className="flex justify-center gap-2 sm:flex-col">
            <span className="font-bold">{user.player.role}</span>
            {`${user?.player.id} ${user.player.name}`}
          </div>

          <Button
            className="my-auto h-12 w-full bg-[#121214] font-medium transition-colors hover:bg-[#0a0a0a] sm:w-52"
            onClick={() => onClockAction(user)}
            disabled={isLoading}
          >
            {isLoading && <Loading sizeClassName="w-6 h-6" />}

            {!isLoading && (
              <>
                <Clipboard size={20} className="mr-2" />
                {user.player.statusClock ? "Fechar Ponto" : "Abrir Ponto"}
              </>
            )}
          </Button>

          <div className="sm:left-none absolute top-5 left-5 flex items-center justify-end gap-2 self-center sm:right-5 lg:static lg:flex-1">
            <Power
              size={18}
              color={user.player.statusClock ? "#3DA35D" : "#ef4c4c"}
            />

            {user.player.statusClock ? "Em serviço" : "Fora de serviço"}
          </div>
        </>
      )}
    </div>
  );
}
