import Head from "next/head";
import React from "react";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { IoLogoDiscord } from "react-icons/io5";

// Components
import Button from "@/components/Button";
import SktIcon from "@/components/Icons/Skt";

// Resources
import Logo from "@/resources/logo.png";

export default function Login() {
  return (
    <>
      <Head>
        <title>DPSKT - Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        <Image src={Logo} alt="DPSKT" className="mx-auto" />

        <p className="text-neutral-600 text-center mt-5 mb-5">
          Faça login para abrir seu ponto!
        </p>

        <Button
          className="bg-[#5865F2] text-white mt-8 h-12 w-64 font-medium text-sm"
          onClick={() => signIn("discord")}
        >
          <IoLogoDiscord size={24} className="mr-3" />
          Entrar com discord
        </Button>
      </div>

      <SktIcon />
    </>
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
