import React from "react";
import { useNavigation } from "react-day-picker";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "phosphor-react";

export default function CustomCaption({ displayMonth }) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <div className="flex items-end justify-between py-1 border-b border-neutral-700 pb-3 mb-3">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        aria-label="Go to Previous Month"
        type="button"
      >
        <ArrowLeft size={20} color="#737373" />
      </button>

      <p className="text font-bold text-neutral-300">
        {format(displayMonth, "MMM yyy")}
      </p>

      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        aria-label="Go to Previous Month"
        type="button"
      >
        <ArrowRight size={20} color="#737373" />
      </button>
    </div>
  );
}
