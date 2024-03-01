/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { Divider } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextSearch } from "lucide-react";

// Hooks
import { useUser } from "@/hooks/useUser";
import { useClock } from "@/hooks/useClock";

// Components
import DatePicker from "@/components/Form/DatePicker";
import ComboBox from "@/components/Home/ClockManage/ComboBox";
import ClockCard from "@/components/Home/History/ClockCard";
import PlayerResume from "@/components/Home/ClockManage/PlayerResume";

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
    users: { data: usersData },
  } = useUser();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { isSubmitSuccessful, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleReportSubmit = useCallback(
    async (formData) => {
      const {
        player: { value: player },
        range,
      } = formData;

      const dateRange = range
        ? { startDate: range[0], endDate: range[1] }
        : null;

      const data = await fetchClocksByIdAndRange(player.id, dateRange);

      setClocks(data);
    },
    [fetchClocksByIdAndRange],
  );

  const onDelete = useCallback((itemHash) => {
    setClocks((prevState) => prevState.filter(({ hash }) => hash !== itemHash));
  }, []);

  const options = useMemo(() => {
    const formattedOptions = usersData.map(({ player }) => ({
      label: `${player.id} · ${player.name}`,
      value: player,
    }));

    return formattedOptions;
  }, [usersData]);

  useEffect(() => {
    const subscription = watch(handleSubmit(handleReportSubmit));

    return () => subscription.unsubscribe();
  }, [handleReportSubmit, handleSubmit, watch]);

  return (
    <div className="my-12 animate-fadeIn">
      <h1 className="mb-2 text-start text-2xl">Gerenciar pontos</h1>

      <p className="text-start text-neutral-500">
        Obtenha um relatório detalhado dos pontos de cada player
      </p>

      <Divider className="mb-0 w-full border-[#1e1e22]" />

      <form
        onSubmit={handleSubmit(handleReportSubmit)}
        className="relative mt-12 flex flex-col gap-8 md:flex-row"
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
      </form>

      <div className="flex gap-8">
        {isDirty && isValid && (
          <PlayerResume player={getValues("player").value} clocks={clocks} />
        )}

        {isSubmitSuccessful && !clocks?.length && (
          <p className="mt-12 flex items-center gap-2 leading-tight  text-neutral-400">
            <TextSearch size={22} />
            Nenhum relatório encontrado...
          </p>
        )}

        {!!clocks?.length && (
          <div className="mt-8 grid flex-1 auto-rows-min grid-cols-2 gap-4">
            {clocks.map((clock) => (
              <ClockCard clock={clock} onDelete={onDelete} key={clock.hash} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClockManage;
