/* eslint-disable function-paren-newline */
import React, { useCallback, useState, useMemo, createContext } from "react";

// Utils
import uuidV4 from "@/utils/uid";

// Hooks
import { useUser } from "@/hooks/useUser";

// Services
import {
  clockIn,
  clockOut,
  deleteClock,
  getClocksById,
} from "@/services/clock";

export const ClockContext = createContext({});

export default function ClockProvider({ children }) {
  const { updateUserData, user } = useUser();

  const [isLoading, setLoading] = useState(false);
  const [playerClocks, setPlayerClocks] = useState([]);

  const fetchClocksByIdAndRange = useCallback(
    async (playerId, range = null) => {
      setLoading(true);

      const { data } = await getClocksById(playerId, range);

      setLoading(false);

      return data;
    },
    []
  );

  const storeClockIn = useCallback(async () => {
    const currentDate = new Date(Date.now());

    const formattedClock = {
      userId: user._id,
      startAt: currentDate,
      hash: uuidV4(),
    };

    await clockIn({
      ...formattedClock,
    });

    setPlayerClocks((prevState) => [formattedClock, ...prevState]);

    await updateUserData({
      ...user,
      player: {
        ...user.player,
        statusClock: true,
      },
    });
  }, [setPlayerClocks, updateUserData, user]);

  const storeClockOut = useCallback(async () => {
    const currentDate = new Date(Date.now());

    const formattedClock = {
      userId: user._id,
      endAt: currentDate,
      hash: playerClocks[0].hash,
    };

    await clockOut({ ...formattedClock });

    setPlayerClocks((prevState) => {
      prevState[0].endAt = currentDate;

      return prevState;
    });

    await updateUserData({
      ...user,
      player: {
        ...user.player,
        statusClock: false,
      },
    });
  }, [playerClocks, setPlayerClocks, updateUserData, user]);

  const onClockAction = useCallback(async () => {
    setLoading(true);

    if (!user.player.statusClock) {
      await storeClockIn(user);
    } else {
      await storeClockOut(user);
    }

    setLoading(false);
  }, [storeClockIn, storeClockOut, user]);

  const onClockDelete = useCallback(
    async (itemHash) => {
      await deleteClock(itemHash);

      setPlayerClocks((prevState) =>
        prevState.filter(({ hash }) => hash !== itemHash)
      );
    },
    [setPlayerClocks]
  );

  const contextValue = useMemo(
    () => ({
      playerClocks,
      setPlayerClocks,
      fetchClocksByIdAndRange,
      isLoading,
      onClockAction,
      onClockDelete,
    }),
    [
      playerClocks,
      fetchClocksByIdAndRange,
      isLoading,
      onClockAction,
      onClockDelete,
      setPlayerClocks,
    ]
  );

  return (
    <ClockContext.Provider value={contextValue}>
      {children}
    </ClockContext.Provider>
  );
}
