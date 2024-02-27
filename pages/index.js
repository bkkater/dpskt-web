import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Divider } from "antd";
import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowSquareOut,
  BookOpen,
  HouseLine,
  Users,
  Warning,
  // Notification,
} from "phosphor-react";
import { TextSearch } from "lucide-react";

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
  const { setUser, setUsers } = useUser();
  const { playerClocks, setPlayerClocks } = useClock();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUser(user);

      if (user?.player.isAdmin) {
        setUsers(allUsers);
      }
    }

    if (clocks) {
      setPlayerClocks(clocks);
    }

    setLoading(false);
  }, [allUsers, clocks, setPlayerClocks, setUser, setUsers, user]);

  const tabClassName =
    "p-3 w-60 data-[state=active]:border-[#168ac5] data-[state=active]:border-b flex align-end justify-center gap-2";

  return (
    <Page pageTitle="Home" className="">
      {!isLoading && user && (
        <div className="container mx-auto">
          <div className="mb-8 flex items-center gap-6">
            <h2 className="animate-fromTop text-2xl font-normal">
              Olá,
              <span className="ml-2 font-bold">{user.player.name}</span>
            </h2>

            <Link
              className="ml-auto hidden h-12 w-52 items-center justify-center gap-2 rounded border border-[#6B52AE] font-medium transition-transform hover:scale-105 md:flex"
              target="_blank"
              href="https://discord.gg/qydNNVaH9G"
            >
              Ir para servidor
              <ArrowSquareOut size={18} />
            </Link>

            <Button className="hidden border border-[#168ac5] bg-transparent md:flex">
              <Warning className="mr-2" size={18} />
              Comunicar problema
            </Button>
          </div>

          <PlayerCard />

          <Tabs.Root
            className="flex min-w-fit animate-fadeIn flex-col"
            defaultValue="history"
          >
            {user.player.isAdmin && (
              <Tabs.List className="mt-8 flex shrink-0 border-b border-[#2B2D42] text-lg">
                <Tabs.Trigger value="history" className={tabClassName}>
                  <HouseLine className="flex self-center" />
                  Home
                </Tabs.Trigger>

                <Tabs.Trigger value="playerManage" className={tabClassName}>
                  <Users className="flex self-center" />
                  Players
                </Tabs.Trigger>

                <Tabs.Trigger value="clockManage" className={tabClassName}>
                  <BookOpen className="flex self-center" />
                  Relatórios
                </Tabs.Trigger>
              </Tabs.List>
            )}

            <Tabs.Content value="history" className="relative outline-none">
              <div className="my-12 animate-fadeIn">
                <h1 className="mb-2 text-start text-2xl">Meus pontos</h1>

                <p className="col-span-full text-neutral-500">
                  Aqui você vai poder visualizar e gerenciar seus pontos
                  registrados no sistema
                </p>

                <Divider className="mb-0 w-full border-[#1e1e22]" />

                {playerClocks.length ? (
                  <div className="grid grid-cols-1 gap-4 py-8 xl:grid-cols-2">
                    {playerClocks.map((clock) => (
                      <ClockCard clock={clock} key={clock.hash} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-12 flex items-center gap-2 leading-tight  text-neutral-400">
                    <TextSearch size={22} />
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
        </div>
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
