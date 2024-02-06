/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Hooks
import { useUser } from "@/hooks/useUser";
import { useClock } from "@/hooks/useClock";

// Components
import DatePicker from "@/components/Form/DatePicker";
import ComboBox from "@/components/Home/ClockManage/ComboBox";
import ClockCard from "@/components/Home/ClockCard";
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
    [fetchClocksByIdAndRange]
  );

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
      </form>

      <div className="flex gap-8">
        {isDirty && isValid && (
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
