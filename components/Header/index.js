import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Bell, Power } from "phosphor-react";

// Components
import Button from "@/components/Button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-[#1B1B1E] border-b border-[#29292E] ">
      <div className="h-28 md:container flex items-center justify-between md:mx-auto md:w-10/12 lg:8/12 md:px-0 px-5 ">
        <Link href="/" className="flex items-center">
          <h1 className="text-4xl text-white">DPSKT</h1>
        </Link>

        <div className="flex items-center gap-8">
          <div className="flex">
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
              <p className="ml-4 color-[#999591]">Logado como</p>
              <p className="ml-4 color-white font-bold">{session?.user.name}</p>
            </div>
          </div>

          <Button className="hover:scale-105 transition-transform rounded hover:bg-neutral-800 p-2 shadow-none">
            <Bell size={32} className="hover:scale-105 transition-transform" />
          </Button>

          <Button
            onClick={() => signOut("discord")}
            className="hover:scale-105 transition-transform rounded hover:bg-neutral-800 p-2 shadow-none"
          >
            <Power size={32} />
          </Button>
        </div>
      </div>
    </header>
  );
}
