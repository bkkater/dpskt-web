import React from "react";
import { SessionProvider } from "next-auth/react";
// import { QueryClientProvider } from "@tanstack/react-query";

// Contexts
import UserProvider from "@/contexts/UserContext";
import ClockProvider from "@/contexts/ClockContext";

// Components
import Head from "@/components/Head";

// Styles
import "@/styles/globals.css";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ClockProvider>
          <Head />

          <Component {...pageProps} />
        </ClockProvider>
      </UserProvider>
    </SessionProvider>
  );
}

export default App;
