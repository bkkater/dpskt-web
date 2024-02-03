import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowSquareOut,
  BookOpenText,
  HouseLine,
  Notification,
  Users,
  Warning,
} from "@phosphor-icons/react";

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
  const { fetchClocksById, playerClocks } = useClock();

  useEffect(() => {
    if (!user) {
      fetchUser(session.user.id);
    }
  }, [fetchUser, session.user.id, user]);

  useEffect(() => {
    if (user?.player.id) {
      fetchClocksById(user.player.id);
    }
  }, [fetchClocksById, user]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const tabClassName =
    "p-3 w-60 data-[state=active]:border-[#286f8d] data-[state=active]:border-b flex align-end justify-center gap-2";

  return (
    <Page pageTitle="Home">
      {!isLoading && user && (
        <>
          <div className="flex align-center mb-8 gap-6">
            <h2 className="font-normal text-2xl">
              Olá,
              <span className="font-bold ml-2">{user.player.name}</span>
            </h2>

            <Button className="border-[#5865F2] border flex items-center font-medium w-52 h-12 transition-transform hover:scale-105 ml-auto">
              Ir para servidor
              <ArrowSquareOut className="ml-2" size={18} />
            </Button>

            <Button className="border-[#286f8d] border flex items-center font-medium w-52 h-12 transition-transform hover:scale-105">
              <Warning className="mr-2" size={18} />
              Comunicar problema
            </Button>
          </div>

          <PlayerCard />

          <Tabs.Root className="flex flex-col min-w-fit" defaultValue="history">
            {user.player.isAdmin && (
              <Tabs.List className="shrink-0 flex border-b border-[#2B2D42] text-lg mt-8">
                <Tabs.Trigger value="history" className={tabClassName}>
                  <HouseLine className="flex self-center" />
                  Home
                </Tabs.Trigger>

                <Tabs.Trigger value="playerManage" className={tabClassName}>
                  <Users className="flex self-center" />
                  Players
                </Tabs.Trigger>

                <Tabs.Trigger value="clockManage" className={tabClassName}>
                  <BookOpenText className="flex self-center" />
                  Relatórios
                </Tabs.Trigger>

                <Tabs.Trigger value="alo" className={tabClassName}>
                  <Notification className="flex self-center" />
                  Notificações
                </Tabs.Trigger>
              </Tabs.List>
            )}

            <Tabs.Content value="history" className="relative outline-none">
              <div className="mt-12">
                <h1 className="text-2xl text-start mb-2">Meus pontos</h1>

                <p className="text-neutral-500 text-start">
                  Aqui você vai poder visualizar e gerenciar seus pontos
                  registrados no sistema
                </p>

                {playerClocks.length ? (
                  <div className="grid grid-cols-2 gap-4 py-8">
                    {playerClocks.map((clock) => (
                      <ClockCard clock={clock} key={clock.hash} />
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500 mt-12">
                    Nenhum registro encontrado
                  </p>
                )}
              </div>
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
