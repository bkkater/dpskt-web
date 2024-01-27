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
  getAllClocks,
  getClocksById,
} from "@/services/clock";

export const ClockContext = createContext({});

export default function ClockProvider({ children }) {
  const { updateUserData, user } = useUser();

  const [isLoading, setLoading] = useState(false);
  const [playerClocks, setPlayerClocks] = useState([]);
  const [allClocks, setAllClocks] = useState([]);

  const fetchAllClocks = useCallback(async () => {
    setLoading(true);

    const { data } = await getAllClocks();

    setAllClocks(data);
    setLoading(false);
  }, []);

  const fetchClocksByID = useCallback(async (playerId) => {
    setLoading(true);

    const { data } = await getClocksById(playerId);

    setPlayerClocks(data);
    setLoading(false);
  }, []);

  const storeClockIn = useCallback(async () => {
    const formattedClock = {
      userId: user._id,
      startAt: new Date(Date.now()),
      hash: uuidV4(),
    };

    await clockIn({
      ...formattedClock,
    });

    setPlayerClocks((prevState) => [formattedClock, ...prevState]);

    updateUserData({
      ...user,
      player: {
        ...user.player,
        statusClock: true,
      },
    });
  }, [updateUserData, user]);

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

    updateUserData({
      ...user,
      player: {
        ...user.player,
        statusClock: false,
      },
    });
  }, [playerClocks, updateUserData, user]);

  const onClockAction = useCallback(async () => {
    if (!user.player.statusClock) {
      await storeClockIn(user);
    } else {
      await storeClockOut(user);
    }
  }, [storeClockIn, storeClockOut, user]);

  const onClockDelete = useCallback(async (itemHash) => {
    await deleteClock(itemHash);

    setPlayerClocks((prevState) =>
      prevState.filter(({ hash }) => hash !== itemHash)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoading,
      allClocks,
      playerClocks,
      fetchAllClocks,
      fetchClocksByID,
      onClockAction,
      onClockDelete,
    }),
    [
      allClocks,
      fetchAllClocks,
      fetchClocksByID,
      isLoading,
      onClockAction,
      onClockDelete,
      playerClocks,
    ]
  );

  return (
    <ClockContext.Provider value={contextValue}>
      {children}
    </ClockContext.Provider>
  );
}
