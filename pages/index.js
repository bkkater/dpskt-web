/* eslint-disable function-paren-newline */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import * as Tabs from "@radix-ui/react-tabs";

// Services
import { getUser } from "@/services/user";
import {
  getAllClocksByID,
  clockIn,
  clockOut,
  deleteClock,
} from "@/services/clock";

// Components
import Page from "@/components/Page";
import Button from "@/components/Button";
import PlayerCard from "@/components/Home/PlayerCard";
import PlayersTable from "@/components/Home/Admin/PlayersTable";
import ClockCardList from "@/components/Home/ClockCardList";

export default function Home({ data: user }) {
  const setTimeOutInterval = useRef(null);
  const { name, isAdmin, id, statusClock } = user.player;

  const [isLoading, setLoading] = useState(true);
  const [clocks, setClocks] = useState([]);
  const [toggleClock, setToggleClock] = useState(statusClock);
  const [isToastOpen, setToastOpen] = useState(false);

  const handleClockAction = useCallback(async () => {
    try {
      if (toggleClock) {
        await clockOut(id);
      } else {
        await clockIn(user._id);
      }

      setToggleClock((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  }, [id, toggleClock, user]);

  const handleClockDelete = useCallback(
    async (index) => {
      setToastOpen(true);

      setTimeOutInterval.current = setTimeout(async () => {
        const deletedClock = clocks[index];

        try {
          await deleteClock(deletedClock._id);

          setClocks((prevState) =>
            prevState.filter((_, itemIndex) => itemIndex !== index)
          );
        } catch (err) {
          console.log(err);
          clearTimeout(setTimeOutInterval.current);
          setTimeOutInterval.current = null;
        }
      }, 5000);

      setToastOpen(false);
    },
    [clocks]
  );

  const handleUndoClockDelete = useCallback(() => {}, []);

  useEffect(() => {
    async function getAllClocks() {
      try {
        const { data } = await getAllClocksByID({ id });

        setClocks(data);
      } catch (err) {
        setClocks([]);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) getAllClocks();
  }, [id, toggleClock]);

  const tabClassName =
    "p-3 w-60 data-[state=active]:border-[#6550b9] data-[state=active]:border-b";

  return (
    <Page pageTitle="Home">
      <div className="flex justify-between align-center mb-8">
        <h2 className="font-normal text-2xl">
          Olá,
          <span className="font-bold ml-2">{name}</span>
        </h2>

        <Button className="border-[#6550b9] border font-medium px-6 h-12 transition-transform hover:scale-105">
          Comunicar problema
        </Button>
      </div>

      <PlayerCard
        user={user}
        toggleClock={toggleClock}
        handleClockAction={handleClockAction}
      />

      <Tabs.Root
        className="flex flex-col min-w-fit mt-8"
        defaultValue="history"
      >
        <Tabs.List className="shrink-0 flex border-b border-[#2B2D42] text-lg">
          <Tabs.Trigger value="history" className={tabClassName}>
            Histórico de Pontos
          </Tabs.Trigger>

          {isAdmin && (
            <>
              <Tabs.Trigger value="manage" className={tabClassName}>
                Gerenciar Players
              </Tabs.Trigger>

              <Tabs.Trigger value="teste" className={tabClassName}>
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
          <ClockCardList
            clocks={clocks}
            isLoading={isLoading}
            handleClockDelete={handleClockDelete}
            handleUndoClockDelete={handleUndoClockDelete}
            isToastOpen
          />
        </Tabs.Content>

        <Tabs.Content value="manage" className="relative outline-none">
          <PlayersTable />
        </Tabs.Content>
      </Tabs.Root>
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

  try {
    const { data } = await getUser(session.user.id);

    return {
      props: {
        session,
        data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
      props: {
        session,
      },
    };
  }
};
