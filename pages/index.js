/* eslint-disable function-paren-newline */
import React, { useCallback, useState } from "react";
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

// Utils
import uuid from "@/utils/uid";

// Components
import Page from "@/components/Page";
import Button from "@/components/Button";
import PlayerCard from "@/components/Home/PlayerCard";
import PlayersTable from "@/components/Home/Admin/PlayersTable";
import ClockCardList from "@/components/Home/ClockCardList";

export default function Home({ data: { user, clocks } }) {
  const { name, isAdmin, statusClock } = user.player;

  const [clocksData, setClocksData] = useState(clocks);
  const [toggleClock, setToggleClock] = useState(statusClock);

  const handleClockIn = useCallback(async (userId) => {
    const formattedClock = {
      userId,
      startAt: new Date(Date.now()),
      hash: uuid(),
    };

    try {
      await clockIn({ ...formattedClock });

      setClocksData((prevState) => [formattedClock, ...prevState]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClockOut = useCallback(
    async (userId) => {
      const currentDate = new Date(Date.now());

      const formattedClock = {
        userId,
        endAt: currentDate,
        hash: clocksData[0].hash,
      };

      try {
        await clockOut({ ...formattedClock });

        setClocksData((prevState) => {
          prevState[0].endAt = currentDate;

          return prevState;
        });
      } catch (err) {
        console.log(err);
      }
    },
    [clocksData]
  );

  const handleClockAction = useCallback(async () => {
    try {
      if (!toggleClock) {
        await handleClockIn(user._id);
      } else {
        await handleClockOut(user._id);
      }

      setToggleClock((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  }, [handleClockIn, handleClockOut, toggleClock, user._id]);

  const handleClockDelete = useCallback(async (hash) => {
    try {
      await deleteClock(hash);

      setClocksData((prevState) =>
        prevState.filter((item) => item.hash !== hash)
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

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
            clocks={clocksData}
            handleClockDelete={handleClockDelete}
          />
        </Tabs.Content>

        <Tabs.Content value="manage" className="relative outline-none">
          <PlayersTable user={user} />
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
    const { data: user } = await getUser(session.user.id);
    const { data: clocks } = await getAllClocksByID(user.player.id);

    return {
      props: {
        session,
        data: {
          user,
          clocks,
        },
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
