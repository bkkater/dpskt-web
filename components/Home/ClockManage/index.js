import React from "react";
import * as Yup from "yup";
import { IoDocumentsOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import * as SelectUI from "@radix-ui/react-select";
import { yupResolver } from "@hookform/resolvers/yup";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Button from "@/components/Button";
import Select from "@/components/Form/Select";
import DatePicker from "@/components/Form/DatePicker";

const schema = Yup.object().shape({
  player: Yup.string().required(),
  range: Yup.array().of(Yup.date().required()).min(2).max(2),
});

function ClockManage() {
  const {
    allUsers: { data: usersData },
  } = useUser();
  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  function handleReportSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleReportSubmit)}
        className="flex gap-8 py-8 relative"
      >
        <Controller
          control={control}
          name="player"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Selecione um player"
              value={value}
              onChange={onChange}
              styleType="dark"
              className="w-80"
            >
              {usersData.map(({ player }) => (
                <SelectUI.Item
                  value={player.id}
                  className="relative p-3 focus:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-700 last:border-transparent"
                  key={player.id}
                >
                  <div className="flex items-center">
                    <SelectUI.ItemText>{`${player.name} | ${player.id}`}</SelectUI.ItemText>
                    <SelectUI.ItemIndicator className="absolute right-2 inline-flex items-center">
                      <CheckIcon />
                    </SelectUI.ItemIndicator>
                  </div>
                </SelectUI.Item>
              ))}
            </Select>
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
          className="bg-[#286f8d] h-12 w-52 font-medium shadow transition-all text-[#e1e1e6] flex items-center gap-2 border-[#286f8d] hover:bg-transparent border"
          type="submit"
        >
          <IoDocumentsOutline size={20} />
          Gerar Relatório
        </Button>
      </form>

      <p className="text-neutral-500 mt-12">Nenhum relatório encontrado</p>
    </>
  );
}

export default ClockManage;
