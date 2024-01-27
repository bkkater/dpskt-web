/* eslint-disable function-paren-newline */
import React, { use, useCallback, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import * as Tabs from "@radix-ui/react-tabs";

// Hooks
import { useUser } from "@/hooks/useUser";
import { useClock } from "@/hooks/useClock";

// Components
import Page from "@/components/Page";
import Button from "@/components/Button";
import PlayerCard from "@/components/Home/PlayerCard";
import Loading from "@/components/Loading";
import ClockCardList from "@/components/Home/ClockCardList";
import PlayersTable from "@/components/Home/PlayersTable";

export default function Home() {
  const { data: session } = useSession();
  const {
    isLoading,
    fetchUser,
    user,
    fetchAllUsers,
    allUsers: { data },
  } = useUser();
  const { fetchClocksByID } = useClock();

  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);

  useEffect(() => {
    fetchUser(session.user.id);
  }, [fetchUser, session.user.id]);

  useEffect(() => {
    if (user?.player.id) {
      fetchClocksByID(user.player.id);
    }
  }, [fetchClocksByID, user]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleSearchChange = useCallback(
    (e) => {
      const searchTerm = e.target.value;
      setSearchUser(searchTerm);
      const regex = new RegExp(searchTerm, "i");

      const filteredItem = data.filter((userItem) => {
        const playerIdMatch = userItem.player.id.match(regex);
        const playerNameMatch = userItem.player.name.match(regex);

        return playerIdMatch || playerNameMatch;
      });

      setFilteredUsers(filteredItem);
    },
    [data]
  );

  const tabClassName =
    "p-3 w-60 data-[state=active]:border-[#6550b9] data-[state=active]:border-b";

  return (
    <Page pageTitle="Home">
      {!isLoading && user && (
        <>
          <div className="flex justify-between align-center mb-8">
            <h2 className="font-normal text-2xl">
              Olá,
              <span className="font-bold ml-2">{user.player.name}</span>
            </h2>

            <Button className="border-[#6550b9] border font-medium px-6 h-12 transition-transform hover:scale-105">
              Comunicar problema
            </Button>
          </div>

          <PlayerCard />

          <Tabs.Root
            className="flex flex-col min-w-fit mt-8"
            defaultValue="clockManage"
          >
            <Tabs.List className="shrink-0 flex border-b border-[#2B2D42] text-lg">
              <Tabs.Trigger value="history" className={tabClassName}>
                Histórico de Pontos
              </Tabs.Trigger>

              {user.player.isAdmin && (
                <>
                  <Tabs.Trigger value="playerManage" className={tabClassName}>
                    Gerenciar Players
                  </Tabs.Trigger>

                  <Tabs.Trigger value="clockManage" className={tabClassName}>
                    Gerenciar Pontos
                  </Tabs.Trigger>

                  <Tabs.Trigger value="alo" className={tabClassName}>
                    Criar Notificação
                  </Tabs.Trigger>
                </>
              )}
            </Tabs.List>

            <Tabs.Content
              value="history"
              className="relative py-8 grid grid-cols-2 gap-4 outline-none"
            >
              <ClockCardList />
            </Tabs.Content>

            <Tabs.Content
              value="playerManage"
              className="relative outline-none"
            >
              <PlayersTable />
            </Tabs.Content>

            <Tabs.Content value="clockManage" className="relative outline-none">
              <>
                <input
                  value={searchUser}
                  onChange={handleSearchChange}
                  placeholder="Pesquisar player"
                  className="w-96 bg-neutral-800 outline-none rounded placeholder:text-neutral-600 h-10 px-4 border-[#2B2D42] border-2"
                />

                {searchUser && (
                  <ul>
                    {filteredUsers.map(({ player }) => (
                      <li key={player.id}>{`${player.id} · ${player.name}`}</li>
                    ))}
                  </ul>
                )}
              </>
            </Tabs.Content>
          </Tabs.Root>
        </>
      )}

      {isLoading && <Loading className="absolute left-1/2 top-1/2" />}
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
