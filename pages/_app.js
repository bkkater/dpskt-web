import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";

// Contexts
import UserProvider from "@/contexts/UserContext";
import ClockProvider from "@/contexts/ClockContext";

// Styles
import "@/styles/globals.css";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider>
        <UserProvider>
          <ClockProvider>
            <Component {...pageProps} />
          </ClockProvider>
        </UserProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
