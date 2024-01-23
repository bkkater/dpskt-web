import React, { useCallback } from "react";
import { ArrowDown, ArrowUp, Gear, XCircle } from "phosphor-react";
import * as Tooltip from "@radix-ui/react-tooltip";

// Services
import { updateUser, deleteUser } from "@/services/user";

// Config
import { ROLE_OPTIONS } from "@/config/general";

function ActionsCell({ row, table }) {
  const selectedUser = row.original;
  const currentUser = table.getState().user;

  const currentRole = row.original.player.role;
  const currentRoleIndex = ROLE_OPTIONS.findIndex(
    (item) => item.label === currentRole
  );

  const handleRankUp = useCallback(async () => {
    try {
      await updateUser({
        ...selectedUser,
        player: {
          ...selectedUser.player,
          role: ROLE_OPTIONS[currentRoleIndex + 1].label,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [currentRoleIndex, selectedUser]);

  const handleRankDown = useCallback(async () => {
    try {
      await updateUser({
        ...selectedUser,
        player: {
          ...selectedUser.player,
          role: ROLE_OPTIONS[currentRoleIndex - 1].label,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [currentRoleIndex, selectedUser]);

  const handleExonerate = useCallback(async () => {
    try {
      await deleteUser(selectedUser.player.id);
    } catch (err) {
      console.log(err);
    }
  }, [selectedUser.player.id]);

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="grid grid-cols-4">
        {currentRoleIndex !== ROLE_OPTIONS.length - 1 ? (
          <Tooltip.Root>
            <Tooltip.Trigger
              onClick={handleRankUp}
              className="flex align-center justify-center"
            >
              <ArrowUp size={20} color="#2D8F60" />
            </Tooltip.Trigger>

            <Tooltip.Content
              className="rounded p-2 bg-[#202024] shadow text-neutral-300"
              sideOffset={5}
            >
              Upar patente
              <Tooltip.Arrow className="fill-[#202024]" />
            </Tooltip.Content>
          </Tooltip.Root>
        ) : (
          <ArrowUp size={20} className="mx-auto" color="#737373" />
        )}

        {currentRoleIndex !== 0 ? (
          <Tooltip.Root>
            <Tooltip.Trigger
              onClick={handleRankDown}
              className="flex align-center justify-center col-start-2"
            >
              <ArrowDown size={20} color="#A12525" />
            </Tooltip.Trigger>

            <Tooltip.Content
              className="rounded p-2 bg-[#202024] shadow text-neutral-300"
              sideOffset={5}
            >
              Rebaixar patente
              <Tooltip.Arrow className="fill-[#202024]" />
            </Tooltip.Content>
          </Tooltip.Root>
        ) : (
          <ArrowDown className="mx-auto" size={20} color="#737373" />
        )}

        <Tooltip.Root>
          <Tooltip.Trigger className="flex align-center justify-center col-start-3">
            <Gear size={20} />
          </Tooltip.Trigger>

          <Tooltip.Content
            className="rounded p-2 bg-[#202024] shadow text-neutral-300"
            sideOffset={5}
          >
            Editar informações
            <Tooltip.Arrow className="fill-[#202024]" />
          </Tooltip.Content>
        </Tooltip.Root>

        {currentUser.discordId !== selectedUser.discordId && (
          <Tooltip.Root>
            <Tooltip.Trigger
              onClick={handleExonerate}
              className="flex align-center justify-center"
            >
              <XCircle size={20} />
            </Tooltip.Trigger>

            <Tooltip.Content
              className="rounded p-2 bg-[#202024] shadow text-neutral-300"
              sideOffset={5}
            >
              Exonerar player
              <Tooltip.Arrow className="fill-[#202024]" />
            </Tooltip.Content>
          </Tooltip.Root>
        )}
      </div>
    </Tooltip.Provider>
  );
}

export default ActionsCell;
