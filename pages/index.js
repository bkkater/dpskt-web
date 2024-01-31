import React, { useEffect } from "react";
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
import ClockCard from "@/components/Home/ClockCard";
import PlayersTable from "@/components/Home/PlayersTable";
import ClockManage from "@/components/Home/ClockManage";

export default function Home() {
  const { data: session } = useSession();
  const { isLoading, fetchUser, user, fetchAllUsers } = useUser();
  const { fetchClocksByID, playerClocks } = useClock();

  useEffect(() => {
    if (!user) {
      fetchUser(session.user.id);
    }
  }, [fetchUser, session.user.id, user]);

  useEffect(() => {
    if (user?.player.id) {
      fetchClocksByID(user.player.id);
    }
  }, [fetchClocksByID, user]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const tabClassName =
    "p-3 w-60 data-[state=active]:border-[#286f8d] data-[state=active]:border-b";

  return (
    <Page pageTitle="Home">
      {!isLoading && user && (
        <>
          <div className="flex justify-between align-center mb-8">
            <h2 className="font-normal text-2xl">
              Olá,
              <span className="font-bold ml-2">{user.player.name}</span>
            </h2>

            <Button className="border-[#286f8d] border flex items-center font-medium w-52 h-12 transition-transform hover:scale-105">
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
              className="relative grid grid-cols-2 gap-4 outline-none"
            >
              {playerClocks.length ? (
                playerClocks.map((clock) => (
                  <ClockCard clock={clock} key={clock.hash} />
                ))
              ) : (
                <p className="text-neutral-500 py-8">
                  Nenhum registro encontrado
                </p>
              )}
            </Tabs.Content>

            {user.player.isAdmin && (
              <>
                <Tabs.Content
                  value="playerManage"
                  className="relative outline-none"
                >
                  <PlayersTable />
                </Tabs.Content>

                <Tabs.Content
                  value="clockManage"
                  className="relative outline-none"
                >
                  <ClockManage />
                </Tabs.Content>
              </>
            )}
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
