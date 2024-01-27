/* eslint-disable import/prefer-default-export */
import { useContext } from "react";

import { UserContext } from "@/contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};
