import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>DPSKT - Portal</title>

      <meta name="description" content="DPSKT portal" />
      <link rel="shortcut icon" href="/public/favicon.ico" />
      <meta name="theme-color" content="#121214" />
      <link rel="apple-touch-icon" href="/resources/icons/icon-128x128.png" />
      <link rel="icon" href="/resources/icons/icon-128x128.png" />

      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}
