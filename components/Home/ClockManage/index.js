/* eslint-disable max-len */
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { IoDocumentsOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Hooks
import { useUser } from "@/hooks/useUser";
import { useClock } from "@/hooks/useClock";

// Components
import Button from "@/components/Button";
import DatePicker from "@/components/Form/DatePicker";
import ComboBox from "@/components/Home/ClockManage/ComboBox";
import ClockCard from "@/components/Home/ClockCard";
import PlayerResume from "./PlayerResume";

const schema = Yup.object().shape({
  player: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.object().required(),
    })
    .required(),
  range: Yup.mixed(),
});

function ClockManage() {
  const [clocks, setClocks] = useState([]);
  const { fetchClocksByIdAndRange } = useClock();
  const {
    allUsers: { data: usersData },
  } = useUser();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleReportSubmit(formData) {
    const {
      player: { value: player },
      range,
    } = formData;

    const dateRange = range ? { startDate: range[0], endDate: range[1] } : null;
    const data = await fetchClocksByIdAndRange(player.id, dateRange);

    setClocks(data);
  }

  const options = useMemo(() => {
    const formattedOptions = usersData.map(({ player }) => ({
      label: `${player.id} · ${player.name}`,
      value: player,
    }));

    return formattedOptions;
  }, [usersData]);

  return (
    <div className="mt-12">
      <h1 className="text-2xl text-start mb-2">Gerenciar pontos</h1>

      <p className="text-neutral-500 text-start">
        Obtenha um relatório detalhado dos pontos de cada player
      </p>

      <form
        onSubmit={handleSubmit(handleReportSubmit)}
        className="flex gap-8 relative mt-12"
      >
        <Controller
          control={control}
          name="player"
          render={({ field: { onChange, value } }) => (
            <ComboBox
              label="Player"
              options={options}
              onChange={onChange}
              value={value || null}
            />
          )}
        />

        <Controller
          control={control}
          name="range"
          render={({ field: { onChange, value } }) => (
            <DatePicker>
              <DatePicker.Range
                styleType="dark"
                label="Range"
                value={value}
                onChange={(dates) => {
                  setValue("range", dates);

                  onChange(dates);
                }}
              />
            </DatePicker>
          )}
        />

        <Button
          className="bg-[#286f8d] h-12 font-medium shadow transition-all text-[#e1e1e6] flex items-center gap-2 border-[#286f8d] hover:bg-transparent border w-60"
          type="submit"
        >
          <IoDocumentsOutline size={20} />
          Gerar Relatório
        </Button>
      </form>

      <div className="flex gap-16">
        {!!clocks.length && (
          <PlayerResume player={getValues("player").value} clocks={clocks} />
        )}

        {isSubmitSuccessful && !clocks?.length && (
          <p className="text-neutral-500 mt-12">Nenhum relatório encontrado</p>
        )}

        {!!clocks?.length && (
          <div className="grid grid-cols-2 gap-4 mt-8 w-full auto-rows-min">
            {clocks.map((clock) => (
              <ClockCard clock={clock} key={clock.hash} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClockManage;
