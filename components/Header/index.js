import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Power } from "phosphor-react";

// Components
import Button from "@/components/Button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-[#1B1B1E] border-b border-[#29292E]">
      <div className="h-28 md:container flex items-center justify-between md:mx-auto md:w-10/12 lg:8/12 md:px-0 px-5">
        <div className="flex items-center">
          <h1 className="text-4xl ml-4">DPSKT</h1>
        </div>

        <div className="flex items-center">
          {session?.user?.image && (
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className="rounded-full md:block hidden"
              alt="Foto do usuário"
            />
          )}

          <div className="md:block hidden">
            <p className="ml-5 color-[#999591]">Bem-vindo(a),</p>
            <p className="ml-5 color-white font-bold">{session?.user.name}</p>
          </div>

          <Button onClick={() => signOut("discord")} className="md:ml-10 ml-5">
            <Power size={32} className="color-[#999591]" />
          </Button>
        </div>
      </div>
    </header>
  );
}
