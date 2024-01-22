import React from "react";
import Image from "next/image";
import { Clipboard } from "phosphor-react";

// Components
import Button from "@/components/Button";

// Resources
import Logo from "@/resources/logo.png";

export default function PlayerCard({ user, toggleClock, handleClockAction }) {
  const { name, role, id } = user.player;

  const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

  if (toggleClock) {
    iconClassName.push("bg-[#2D8F60]");
  } else {
    iconClassName.push("bg-[#A12525]");
  }

  return (
    <div className="bg-[#202024] w-full rounded p-8 flex gap-16 border-2 border-[#29292E]">
      <Image src={Logo} width={120} alt="DPSKT" priority />

      <div className="flex flex-col text-center justify-center">
        <span className="font-bold">{role}</span>
        {`${id} ${name}`}
      </div>

      <Button
        className="bg-[#121214] font-medium py-2 px-12 h-12 my-auto hover:bg-[#0a0a0a] transition-color"
        onClick={handleClockAction}
      >
        <Clipboard size={20} className="mr-2" />
        {toggleClock ? "FECHAR PONTO" : "ABRIR PONTO"}
      </Button>

      <div className="flex self-center align-center justify-end flex-1">
        <div className={iconClassName.join(" ")} />
        {toggleClock ? "Em serviço" : "Fora de serviço"}
      </div>
    </div>
  );
}
