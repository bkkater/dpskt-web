import React from "react";
import Head from "next/head";

// Resources

import { twMerge } from "tailwind-merge";
import Header from "../Header";

export default function Page({ className, children, pageTitle }) {
  return (
    <div className="scrollbar-thumb-rounded scrollbar-rounded-large flex h-full w-full flex-col overflow-auto scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-800">
      <Head>
        <title>{`DPSKT - ${pageTitle}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main
        className={twMerge(
          "animate-fadeIn h-full w-full  bg-[#121214] px-5 py-10",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
