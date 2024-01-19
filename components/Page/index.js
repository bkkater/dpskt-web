import React from "react";
import Head from "next/head";

// Resources

import Header from "../Header";

export default function Page({ className, children, pageTitle }) {
  const classList = [
    "container py-10 mx-auto md:w-10/12 lg:8/12 md:px-0 px-5 w-full flex-1",
  ];

  if (className) {
    classList.push(className);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Head>
        <title>{`DPSKT - ${pageTitle}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={classList.join(" ")}>{children}</main>
    </div>
  );
}
