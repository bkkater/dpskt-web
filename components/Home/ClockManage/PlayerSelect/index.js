import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

// Hooks
import { useUser } from "@/hooks/useUser";

function PlayerSelect({ selectedPlayerId, setSelectedPlayerId }) {
  const {
    allUsers: { data },
  } = useUser();

  return (
    <Select.Root value={selectedPlayerId} onValueChange={setSelectedPlayerId}>
      <Select.Trigger
        className="inline-flex items-center justify-between rounded px-4 h-12 gap-2 shadow bg-neutral-800 border-2 border-neutral-800 data-[state=open]:border-[#084551] relative w-96 outline-none"
        aria-label="player"
      >
        {selectedPlayerId ? (
          <Select.Value />
        ) : (
          <p className="text-neutral-600">Selecione um player</p>
        )}
        <Select.Icon className="ml-2">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content
        className="shadow bg-neutral-800 rounded-b w-96 bottom-0"
        position="popper"
        sideOffset={5}
      >
        <Select.ScrollUpButton className="flex items-center justify-center">
          <ChevronUpIcon />
        </Select.ScrollUpButton>

        <Select.Viewport className="shadow-lg">
          {data.map(({ player }) => (
            <Select.Item
              value={player.id}
              className="relative p-3 focus:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-700 last:border-transparent"
              key={player.id}
            >
              <div className="flex items-center">
                <Select.ItemText>{`${player.name} | ${player.id}`}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </div>
            </Select.Item>
          ))}
        </Select.Viewport>

        <Select.ScrollDownButton className="flex items-center justify-center text-gray-300">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Root>
  );
}

export default PlayerSelect;
