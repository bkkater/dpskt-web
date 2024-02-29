import React from "react";
import { Divider } from "antd";
import { TextSearch } from "lucide-react";

// Hooks
import { useClock } from "@/hooks/useClock";

// Components
import ClockCard from "@/components/Home/History/ClockCard";

export default function History() {
  const { playerClocks } = useClock();

  return (
    <div className="my-12 animate-fadeIn">
      <h1 className="mb-2 text-start text-2xl">Meus pontos</h1>

      <p className="col-span-full text-neutral-500">
        Aqui você vai poder visualizar e gerenciar seus pontos registrados no
        sistema
      </p>

      <Divider className="mb-0 w-full border-[#1e1e22]" />

      {playerClocks.length ? (
        <div className="grid grid-cols-1 gap-4 py-8 xl:grid-cols-2">
          {playerClocks.map((clock) => (
            <ClockCard clock={clock} key={clock.hash} />
          ))}
        </div>
      ) : (
        <p className="mt-12 flex items-center gap-2 leading-tight  text-neutral-400">
          <TextSearch size={22} />
          Nenhum registro encontrado...
        </p>
      )}
    </div>
  );
}
