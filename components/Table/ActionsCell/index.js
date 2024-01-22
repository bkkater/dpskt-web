import React from "react";
import { ArrowDown, ArrowUp, Gear, XCircle } from "phosphor-react";
import * as Tooltip from "@radix-ui/react-tooltip";

function ActionsCell() {
  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="flex justify-between">
        <Tooltip.Root>
          <Tooltip.Trigger>
            <ArrowUp size={20} />
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
