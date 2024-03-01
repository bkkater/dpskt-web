import React from "react";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { IoLogoDiscord } from "react-icons/io5";

// Components
import Button from "@/components/Button";

// Resources
import Logo from "@/resources/dpskt.png";

export default function Login() {
  return (
    <div className="bg-abstract flex h-full animate-fadeIn">
      <div className="m-auto flex w-80 animate-fadeIn flex-col gap-8 rounded border border-[#29292E] bg-[#202024] p-10">
        <Image
          src={Logo}
          alt="DPSKT"
          className="mx-auto"
          width={180}
          priority
        />

        <p className="text-center text-neutral-500">
          Faça login para abrir acessar a plataforma!
        </p>

        <Button
          className="hover:scale-1 w-full bg-[#5865f2] transition-colors hover:bg-[#5059bb]"
          onClick={() => signIn("discord")}
        >
          <IoLogoDiscord size={24} className="mr-3" />
          Entrar com discord
        </Button>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
