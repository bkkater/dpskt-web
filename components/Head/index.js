import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DPSKT Portal</title>
      <meta name="description" content="DPSKT Portal" />
      <meta name="theme-color" content="#121214" />
      <meta name="background-color" content="#121214" />
      <meta name="display" content="standalone" />
      <meta name="orientation" content="portrait" />
      <meta name="scope" content="/" />
      <meta name="start_url" content="/" />

      <link rel="manifest" href="/manifest.json" />

      <link rel="shortcut icon" href="favicon.ico" />
      <link
        rel="icon"
        href="/icons/icon-48x48.png"
        sizes="48x48"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-72x72.png"
        sizes="72x72"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-96x96.png"
        sizes="96x96"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-128x128.png"
        sizes="128x128"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-144x144.png"
        sizes="144x144"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-152x152.png"
        sizes="152x152"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-192x192.png"
        sizes="192x192"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-384x384.png"
        sizes="384x384"
        type="image/png"
      />
      <link
        rel="icon"
        href="/icons/icon-512x512.png"
        sizes="512x512"
        type="image/png"
      />
    </Head>
  );
}
