import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import * as SelectUI from "@radix-ui/react-select";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Gear,
  IdentificationCard,
  PoliceCar,
  Suitcase,
  User,
  XCircle,
} from "@phosphor-icons/react";

// Config
import { CORPORATION_OPTIONS, ROLE_OPTIONS } from "@/config/general";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Button from "@/components/Button";
import Select from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import Checkbox from "@/components/Form/Checkbox";
import DatePicker from "@/components/Form/DatePicker";
import TooltipWithDialogItem from "./TooltipWithDialogItem";
import TooltipItem from "./TooltipItem";
import TooltipWithAlertItem from "./TooltipWithAlertItem";

// Validation
const schema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  role: Yup.string().required(),
  corporation: Yup.string().required(),
  id: Yup.number().positive().required(),
  joinedAt: Yup.date().required(),
});

function ActionsCell({ row }) {
  const {
    user,
    rankPlayerUp,
    rankPlayerDown,
    updateUserData,
    exonerateUser,
    allUsers: { data: users },
  } = useUser();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const selectedUser = users.find(
    ({ discordId }) => row.original.discordId === discordId
  );

  const currentRoleIndex = ROLE_OPTIONS.findIndex(
    (item) => item.label === selectedUser.player.role
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedUser.player.name,
      id: selectedUser.player.id,
      corporation: selectedUser.player.corporation,
      role: selectedUser.player.role,
      isAdmin: selectedUser.player.isAdmin,
      joinedAt: selectedUser.player.joinedAt,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateSubmit = useCallback(
    async (data) => {
      const { corporation, id, isAdmin, joinedAt, name, role } = data;

      await updateUserData({
        ...selectedUser,
        player: {
          ...selectedUser.player,
          id: id.toString(),
          joinedAt,
          corporation,
          isAdmin,
          name,
          role,
        },
      });

      setUpdateModalOpen(false);
    },
    [selectedUser, updateUserData]
  );

  const handlePlayerRank = useCallback(
    ({ type }) => {
      if (type === "up") {
        const updatedRole = ROLE_OPTIONS[currentRoleIndex + 1].label;

        rankPlayerUp(selectedUser, updatedRole);
        setValue("role", updatedRole);
      } else if (type === "down") {
        const updatedRole = ROLE_OPTIONS[currentRoleIndex - 1].label;

        rankPlayerDown(selectedUser, updatedRole);
        setValue("role", updatedRole);
      }
    },
    [currentRoleIndex, rankPlayerDown, rankPlayerUp, selectedUser, setValue]
  );

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="grid grid-cols-4">
        {currentRoleIndex !== ROLE_OPTIONS.length - 1 ? (
          <TooltipItem
            iconColor="#2D8F60"
            label="Upar patente"
            icon={ArrowUp}
            onClick={() => handlePlayerRank({ type: "up" })}
          />
        ) : (
          <ArrowUp size={20} className="mx-auto" color="#737373" />
        )}

        {currentRoleIndex !== 0 ? (
          <TooltipItem
            iconColor="#A12525"
            label="Rebaixar patente"
            icon={ArrowDown}
            onClick={() => handlePlayerRank({ type: "down" })}
          />
        ) : (
          <ArrowDown className="mx-auto" size={20} color="#737373" />
        )}

        <TooltipWithDialogItem
          icon={Gear}
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          label="Editar informações"
        >
          <Dialog.Content className="bg-[#202024] rounded shadow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto flex flex-col items-start px-8 py-6 text-[#e1e1e6]">
            <h1 className="text-2xl mb-2 text-start">Editar</h1>

            <p className="text-neutral-500 text-start mb-8">
              Altere informações do personagem escolhido
            </p>

            <form
              onSubmit={handleSubmit(handleUpdateSubmit)}
              className="w-full"
            >
              <Input
                label="Nome"
                placeholder="Nome Completo"
                icon={User}
                error={errors.name?.message}
                {...register("name")}
              />

              <Input
                label="ID"
                placeholder="ID"
                type="number"
                icon={IdentificationCard}
                error={errors.id?.message || null}
                {...register("id")}
              />

              <Controller
                control={control}
                name="corporation"
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Corporação"
                    icon={PoliceCar}
                    value={value}
                    onChange={onChange}
                    error={errors.corporation?.message || null}
                  >
                    {CORPORATION_OPTIONS.map((option) => (
                      <SelectUI.Item
                        className="relative p-3 focus:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-800 last:border-transparent"
                        value={option.label}
                        key={option.label}
                      >
                        <div className="flex items-center">
                          <SelectUI.ItemText>{option.label}</SelectUI.ItemText>
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
                name="role"
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Cargo"
                    icon={Suitcase}
                    value={value}
                    onChange={onChange}
                    error={errors.role?.message || null}
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <SelectUI.Item
                        className="relative p-3 focus:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-800 last:border-transparent"
                        value={option.label}
                        key={option.label}
                      >
                        <div className="flex items-center">
                          <SelectUI.ItemText>{option.label}</SelectUI.ItemText>
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
                name="joinedAt"
                render={({ field: { onChange, value } }) => (
                  <DatePicker>
                    <DatePicker.Simple
                      styleType="darken"
                      onChange={onChange}
                      value={value}
                      icon={Calendar}
                    />
                  </DatePicker>
                )}
              />

              {selectedUser.discordId !== user.discordId && (
                <Controller
                  control={control}
                  name="isAdmin"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      name="isAdmin"
                      label="Acesso ao painel administrativo"
                      checked={value}
                      onChange={onChange}
                      defaultValue={selectedUser.player.isAdmin}
                    />
                  )}
                />
              )}

              <div className="flex gap-4 mt-6 pt-6 border-t border-[#34343a] rounded">
                <Dialog.Close className="border-[#4689b3] hover:bg-[#4689b3] border-2 rounded h-12 font-medium text-sm py-2 shadow-transparent transition-colors w-full">
                  Cancelar
                </Dialog.Close>

                <Button
                  className="bg-[#286f8d] hover:bg-[#4689b3] h-12 font-medium w-full text-sm py-2 shadow shadow-neutral-900 transition-colors"
                  type="submit"
                >
                  Salvar alterações
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </TooltipWithDialogItem>

        {user.discordId !== selectedUser.discordId && (
          <TooltipWithAlertItem
            icon={XCircle}
            onClick={() => exonerateUser(selectedUser.player.id)}
            label="Exonerar player"
            title="Tem certeza que deseja exonerar?"
            description="A ação não poderá ser desfeita e o player será exonerado permanentemente."
            buttonLabel="Sim, apagar player"
          />
        )}
      </div>
    </Tooltip.Provider>
  );
}

export default ActionsCell;
