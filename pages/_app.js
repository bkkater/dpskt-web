import React from "react";
import { SessionProvider } from "next-auth/react";

// Contexts
import UserProvider from "@/contexts/UserContext";
import ClockProvider from "@/contexts/ClockContext";

// Styles
import "@/styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ClockProvider>
          <Component {...pageProps} />
        </ClockProvider>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
