import React from "react";
import { twMerge } from "tailwind-merge";

// Components
import Header from "@/components/Header";

export default function Page({ className, children }) {
  return (
    <div className="scrollbar-thumb-rounded scrollbar-rounded-large flex h-full w-full flex-col overflow-auto scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-800">
      <Header />

      <main
        className={twMerge(
          "h-full w-full animate-fadeIn  bg-[#121214] px-5 py-10",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
