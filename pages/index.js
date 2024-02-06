import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import { Divider } from "antd";
import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowSquareOut,
  BookOpenText,
  HouseLine,
  ListMagnifyingGlass,
  Notification,
  Users,
  Warning,
} from "@phosphor-icons/react/dist/ssr";

// Services
import { getAllUsers, getUser } from "@/services/user";
import { getClocksById } from "@/services/clock";

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

export default function Home({ user, clocks, allUsers }) {
  const { isLoading, setUser, setUsers } = useUser();
  const { setPlayerClocks } = useClock();

  useEffect(() => {
    if (user) {
      setUser(user);

      if (user?.player.isAdmin) {
        setUsers(allUsers);
      }
    }
  }, [allUsers, setUser, setUsers, user]);

  useEffect(() => {
    if (clocks) {
      setPlayerClocks(clocks);
    }
  }, [clocks, setPlayerClocks]);

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

            <Button className="border-[#5865F2] border items-center font-medium w-52 h-12 transition-transform hover:scale-105 ml-auto hidden md:flex">
              Ir para servidor
              <ArrowSquareOut className="ml-2" size={18} />
            </Button>

            <Button className="border-[#286f8d] border items-center font-medium w-52 h-12 transition-transform hover:scale-105 hidden md:flex">
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

                <p className="text-neutral-500 col-span-full">
                  Aqui você vai poder visualizar e gerenciar seus pontos
                  registrados no sistema
                </p>

                <Divider className="w-full border-[#1e1e22] mb-0" />

                {clocks.length ? (
                  <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 py-8">
                    {clocks.map((clock) => (
                      <ClockCard clock={clock} key={clock.hash} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-12 flex gap-2 align-center leading-tight  text-neutral-400">
                    <ListMagnifyingGlass size={22} />
                    Nenhum registro encontrado...
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

function handleRedirect(error) {
  if (error.response?.status === 404) {
    return { destination: "/register" };
  }

  return { destination: "/404" };
}

async function fetchData(sessionUserId) {
  const { data: user } = await getUser(sessionUserId);
  const { data: clocks } = await getClocksById(user.player.id);
  let allUsers = null;

  if (user.player.isAdmin) {
    const { data: usersData } = await getAllUsers();
    allUsers = usersData;
  }

  return { user, clocks, allUsers };
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

  try {
    const { user, clocks, allUsers } = await fetchData(session.user.id);

    return {
      props: {
        session,
        user,
        clocks,
        allUsers,
      },
    };
  } catch (error) {
    return { redirect: handleRedirect(error) };
  }
};
