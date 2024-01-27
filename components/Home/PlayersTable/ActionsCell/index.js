import React, { useCallback, useRef, useState } from "react";
import { parse } from "date-fns";
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
} from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Form } from "@unform/web";

// Config
import { CORPORATION_OPTIONS, ROLE_OPTIONS } from "@/config/general";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Button from "@/components/Button";
import InputGroup from "@/components/Form/InputGroup";
import Select from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import DatePicker from "@/components/Form/DatePicker";
import Checkbox from "@/components/Form/Checkbox";
import TooltipWithDialogItem from "./TooltipWithDialogItem";
import TooltipItem from "./TooltipItem";
import TooltipWithAlertItem from "./TooltipWithAlertItem";

function ActionsCell({ row }) {
  const { user, rankPlayerUp, rankPlayerDown, updateUserData, exonerateUser } =
    useUser();
  const formRef = useRef(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const selectedUser = row.original;

  const currentRole = row.original.player.role;
  const currentRoleIndex = ROLE_OPTIONS.findIndex(
    (item) => item.label === currentRole
  );
  const currentCorporationIndex = CORPORATION_OPTIONS.findIndex(
    (item) => item.label === row.original.player.corporation
  );

  const handleSubmit = useCallback(async () => {
    const { coorporation, id, isAdmin, joinedAt, name, role } =
      formRef.current.getData();

    await updateUserData({
      ...selectedUser,
      player: {
        ...selectedUser.player,
        joinedAt: parse(joinedAt, "dd/MM/yyyy", new Date()),
        coorporation,
        id,
        isAdmin,
        name,
        role,
      },
    });

    setUpdateModalOpen(false);
  }, [selectedUser, updateUserData]);

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="grid grid-cols-4">
        {currentRoleIndex !== ROLE_OPTIONS.length - 1 ? (
          <TooltipItem
            iconColor="#2D8F60"
            label="Upar patente"
            icon={ArrowUp}
            onClick={() => rankPlayerUp(selectedUser, currentRoleIndex)}
          />
        ) : (
          <ArrowUp size={20} className="mx-auto" color="#737373" />
        )}

        {currentRoleIndex !== 0 ? (
          <TooltipItem
            iconColor="#A12525"
            label="Rebaixar patente"
            icon={ArrowDown}
            onClick={() => rankPlayerDown(selectedUser, currentRoleIndex)}
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
          <Dialog.Content className="bg-[#202024] rounded shadow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto text-black flex flex-col items-start p-10">
            <Form onSubmit={handleSubmit} ref={formRef}>
              <InputGroup label="Nome" hideLabel leftIcon={User}>
                <Input
                  name="name"
                  placeholder="Nome Completo"
                  defaultValue={selectedUser.player.name}
                  className="text-[#E1E1E6]"
                />
              </InputGroup>

              <InputGroup label="ID" hideLabel leftIcon={IdentificationCard}>
                <Input
                  type="number"
                  name="id"
                  placeholder="ID"
                  defaultValue={selectedUser.player.id}
                />
              </InputGroup>

              <InputGroup className="flex-1" leftIcon={Calendar}>
                <DatePicker
                  name="joinedAt"
                  placeholder="Data de Recrutamento"
                  defaultValue={selectedUser.player.joinedAt}
                />
              </InputGroup>

              <InputGroup
                className="flex-1"
                leftIcon={PoliceCar}
                label="corporation"
                hideLabel
              >
                <Select
                  options={CORPORATION_OPTIONS}
                  name="corporation"
                  placeholder="Corporação"
                  defaultValue={CORPORATION_OPTIONS[currentCorporationIndex]}
                />
              </InputGroup>

              <InputGroup
                className="flex-1"
                leftIcon={Suitcase}
                label="Patente"
                hideLabel
              >
                <Select
                  options={ROLE_OPTIONS}
                  name="role"
                  placeholder="Patente"
                  defaultValue={ROLE_OPTIONS[currentRoleIndex]}
                />
              </InputGroup>

              <Checkbox
                name="isAdmin"
                label="Admin"
                defaultValue={selectedUser.player.isAdmin}
              />

              <Button
                className="h-10 font-bold mt-8 w-full text-sm py-2 bg-[#202031] hover:bg-[#171724] border border-neutral-700 transition-colors"
                type="submit"
              >
                SALVAR
              </Button>
            </Form>
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
