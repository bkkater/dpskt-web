import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import { DatePicker as AntdDatePicker, ConfigProvider, theme } from "antd";
import * as SelectUI from "@radix-ui/react-select";
import locale from "antd/locale/pt_BR";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Button from "@/components/Button";
import Select from "@/components/Form/Select";

const DatePicker = AntdDatePicker.generatePicker(dateFnsGenerateConfig);

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

        <ConfigProvider
          locale={locale}
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#286f8d",
              fontSize: "1rem",
            },
          }}
        >
          <DatePicker.RangePicker
            className="h-12 rounded bg-neutral-800 border-transparent shadow px-3 w-64"
            placeholder={["Data inicial", "Data final"]}
            suffixIcon={null}
            superNextIcon={null}
            superPrevIcon={null}
            getPopupContainer={(trigger) => trigger.parentElement}
            format="DD/MM/YYYY"
          />
        </ConfigProvider>

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
