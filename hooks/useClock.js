/* eslint-disable import/prefer-default-export */
import { useContext } from "react";

import { ClockContext } from "@/contexts/ClockContext";

export const useClock = () => {
  const context = useContext(ClockContext);

  if (!context) {
    throw new Error("useClock must be used within an ClockProvider");
  }

  return context;
};
