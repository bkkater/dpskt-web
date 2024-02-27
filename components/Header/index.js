import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Power } from "phosphor-react";

// Components
import Button from "@/components/Button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-[#29292E] bg-[#1B1B1E] ">
      <div className="lg:8/12 flex h-28 items-center justify-between px-5 md:container md:mx-auto md:w-10/12 md:px-0 ">
        <Link href="/" className="flex gap-2">
          <h1 className="leading-0 my-auto text-5xl leading-none">DPSKT</h1>
        </Link>

        <div className="flex items-center gap-8">
          <div className="flex">
            {session?.user?.image && (
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                className="hidden rounded-full md:block"
                alt="Foto do usuário"
              />
            )}

            <div className="hidden md:block">
              <p className="color-[#999591] ml-4">Logado como</p>
              <p className="color-white ml-4 font-bold">{session?.user.name}</p>
            </div>
          </div>

          <Button
            className="w-auto bg-transparent p-2 shadow-none hover:bg-neutral-800"
            onClick={() => signOut("discord")}
          >
            <Power size={32} />
          </Button>
        </div>
      </div>
    </header>
  );
}
