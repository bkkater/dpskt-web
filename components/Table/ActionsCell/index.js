import React, { useCallback } from "react";
import { ArrowDown, ArrowUp, Gear, XCircle } from "phosphor-react";
import * as Tooltip from "@radix-ui/react-tooltip";

// Services
import { updateUser } from "@/services/user";

// Components
import Button from "@/components/Button";
import { ROLE_OPTIONS } from "@/config/general";

function ActionsCell({ row }) {
  const user = row.original;

  const currentRole = row.original.player.role;
  const currentRoleIndex = ROLE_OPTIONS.findIndex(
    (item) => item.label === currentRole
  );

  const handleRankUp = useCallback(async () => {
    try {
      await updateUser({
        ...user,
        player: {
          ...user.player,
          role: ROLE_OPTIONS[currentRoleIndex + 1].label,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [currentRoleIndex, user]);

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="flex justify-between">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              onClick={handleRankUp}
              disabled={currentRoleIndex === ROLE_OPTIONS.length - 1}
            >
              <ArrowUp size={20} />
            </Button>
          </Tooltip.Trigger>

          <Tooltip.Content
            className="rounded p-2 bg-[#202024] shadow text-neutral-300"
            sideOffset={5}
          >
            Upar patente
            <Tooltip.Arrow className="fill-[#202024]" />
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
            <ArrowDown size={20} />
          </Tooltip.Trigger>

          <Tooltip.Content
            className="rounded p-2 bg-[#202024] shadow text-neutral-300"
            sideOffset={5}
          >
            Rebaixar patente
            <Tooltip.Arrow className="fill-[#202024]" />
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
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

        <Tooltip.Root>
          <Tooltip.Trigger>
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
      </div>
    </Tooltip.Provider>
  );
}

export default ActionsCell;
