import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import { User } from "phosphor-react";
import { DatePicker as AntdDatePicker, ConfigProvider, theme } from "antd";
import * as SelectUI from "@radix-ui/react-select";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Button from "@/components/Button";
import Select from "@/components/Form/Select";
import DatePicker from "@/components/Form/DatePicker";
import { format } from "date-fns";

function ClockManage() {
  const {
    allUsers: { data: usersData },
  } = useUser();
  const { handleSubmit, control } = useForm();

  function handleReportSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleReportSubmit)}
        className="flex gap-8 py-8"
      >
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <AntdDatePicker />
        </ConfigProvider>

        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="w-60"
              mode="simple"
              date={value}
              onDayClick={onChange}
            >
              <input
                placeholder="Selecione uma data"
                value={value ? format(value, "dd/MM/yyyy") : null}
                className="placeholder:text-neutral-500 bg-transparent w-full h-full outline-none cursor-pointer"
              />
            </DatePicker>
          )}
        />

        <Controller
          control={control}
          name="player"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Selecione um player"
              icon={User}
              value={value}
              onChange={onChange}
              styleType="dark"
              className="w-60"
              // error={errors.corporation?.message || null}
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
