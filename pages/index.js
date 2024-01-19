import React, { useState } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";

// Components
import Page from "@/components/Page";

// Resources
import Logo from "@/resources/logo.png";
import Button from "@/components/Button";
import { Clipboard } from "phosphor-react";

export default function Home() {
  const [toogleClock, setToggleClock] = useState(false);
  const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

  if (toogleClock) {
    iconClassName.push("bg-[#2D8F60]");
  } else {
    iconClassName.push("bg-[#A12525]");
  }

  return (
    <Page pageTitle="Home">
      <div className="bg-[#202024] w-full rounded p-8 flex gap-16 border-2 border-[#29292E]">
        <Image src={Logo} width={120} />

        <div className="flex flex-col text-center justify-center">
          <span className="font-bold">Recruta</span>
          Lara Zaitsev
        </div>

        <Button
          className="bg-[#121214] font-medium py-2 px-12 h-12 my-auto"
          onClick={() => setToggleClock((prevState) => !prevState)}
        >
          <Clipboard size={20} className="mr-2" />
          {toogleClock ? "FECHAR PONTO" : "ABRIR PONTO"}
        </Button>

        <div className="flex self-center align-center justify-end flex-1">
          <div className={iconClassName.join(" ")} />
          {toogleClock ? "Em serviço" : "Fora de serviço"}
        </div>
      </div>

      <h2 className="text-2xl mt-16">Histórico de pontos</h2>

      <p className="text-neutral-500 mt-4">Nenhum registro encontrado</p>
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const id = process.env.DISCORD_WEBHOOK_ID;
  const token = process.env.DISCORD_WEBHOOK_TOKEN;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      id,
      token,
    },
  };
};
