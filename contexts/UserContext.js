import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";

// Services;
import {
  deleteUser,
  getAllUsers,
  getUser,
  storeUser,
  updateUser,
} from "@/services/user";

export const UserContext = React.createContext({});

export default function UserProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState({
    data: [],
    totalPlayers: null,
    totalClocks: null,
  });

  const router = useRouter();

  const updateState = useCallback(
    ({ updatedUser }) => {
      const userIndex = allUsers.data.findIndex(
        ({ discordId }) => discordId === updatedUser.discordId
      );

      setAllUsers((prevState) => {
        const newState = { ...prevState };

        const updatedData = prevState.data.map((userData, index) => {
          if (index === userIndex) {
            return updatedUser;
          }

          return userData;
        });

        return { ...newState, data: updatedData };
      });

      if (updatedUser.discordId === user.discordId) {
        setUser(updatedUser);
      }
    },
    [allUsers.data, user]
  );

  const fetchUser = useCallback(
    async (discordId) => {
      try {
        setLoading(true);

        const { data } = await getUser(discordId);
        setUser(data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        router.push("/register");
      }
    },
    [router]
  );

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);

    const {
      data: { users, entries, onlineClocks },
    } = await getAllUsers();

    setAllUsers({
      data: users,
      totalPlayers: entries,
      totalClocks: onlineClocks,
    });

    setLoading(false);
  }, []);

  const registerUser = useCallback(async (discordId, data) => {
    setLoading(true);

    const newUser = {
      player: { ...data, joinedAt: new Date() },
      discordId,
    };

    await storeUser(newUser);

    setLoading(false);
  }, []);

  const rankPlayerUp = useCallback(
    async (selectedUser, updatedRole) => {
      const updatedUser = {
        ...selectedUser,
        player: {
          ...selectedUser.player,
          role: updatedRole,
        },
      };

      await updateUser(updatedUser);

      updateState({ updatedUser });
    },
    [updateState]
  );

  const rankPlayerDown = useCallback(
    async (selectedUser, updatedRole) => {
      const updatedUser = {
        ...selectedUser,
        player: {
          ...selectedUser.player,
          role: updatedRole,
        },
      };

      try {
        await updateUser(updatedUser);

        updateState({ updatedUser });
      } catch (err) {
        console.log(err.response);
      }
    },
    [updateState]
  );

  const exonerateUser = useCallback(
    async (playerId) => {
      const userIndex = allUsers.data.findIndex(
        ({ player: { id } }) => id === playerId
      );

      try {
        await deleteUser(playerId);

        return setAllUsers((prevState) => {
          prevState.splice(userIndex, 1);
        });
      } catch (err) {
        return err.response;
      }
    },
    [allUsers.data]
  );

  const updateUserData = useCallback(
    async (updatedUser) => {
      await updateUser(updatedUser);

      updateState({ updatedUser });
    },
    [updateState]
  );

  const contextValue = useMemo(
    () => ({
      user,
      fetchUser,
      fetchAllUsers,
      registerUser,
      rankPlayerUp,
      rankPlayerDown,
      exonerateUser,
      updateUserData,
      allUsers,
      isLoading,
    }),
    [
      user,
      fetchUser,
      fetchAllUsers,
      registerUser,
      rankPlayerUp,
      rankPlayerDown,
      exonerateUser,
      updateUserData,
      allUsers,
      isLoading,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
