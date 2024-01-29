import React, { useCallback } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import styles from "react-day-picker/dist/style.module.css";

// Components
import CustomCaption from "./CustomCaption";

export default function DatePicker({
  className,
  mode,
  date,
  onDayClick,
  children,
  ...rest
}) {
  const [showPopover, setShowPopover] = React.useState(false);

  const styleClassNames = {
    ...styles,
    cell: "w-9 h-9 text-center",
    day: "hover:bg-neutral-700 w-full h-full transition-colors rounded m-0 font-normal text-sm",
    day_today: "relative font-bold before:rounded-full border-[#286f8d]",
    day_selected: "bg-neutral-700",
  };

  const handleDateChange = useCallback(
    (selectedDate) => {
      onDayClick(selectedDate);

      setShowPopover(false);
    },
    [onDayClick]
  );

  return (
    <Popover.Root open={showPopover} onOpenChange={setShowPopover}>
      <Popover.Trigger className="w-full" {...rest}>
        {children}
      </Popover.Trigger>

      <Popover.Content
        className="bg-neutral-800 z-50 rounded-lg shadow-lg border-2 border-[#29292E]"
        side="top"
        align="start"
        sideOffset={8}
      >
        <DayPicker
          hideHead
          showOutsideDays
          className="text-sm font-bold"
          mode={mode}
          selected={date}
          onDayClick={handleDateChange}
          locale={ptBR}
          classNames={styleClassNames}
          components={{
            Caption: CustomCaption,
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
