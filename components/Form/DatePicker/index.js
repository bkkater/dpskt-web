import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import DatePickerComponent from "react-datepicker";

// Styles
import "react-datepicker/dist/react-datepicker.css";

function DatePicker({ name }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current?.input.value,
      setValue: (ref, value) => {
        ref.current.input.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <DatePickerComponent
      ref={inputRef}
      selected={startDate}
      minDate={today}
      name={name}
      onChange={(date) => setStartDate(date)}
      className="bg-transparent w-full outline-none"
      dateFormat="dd/MM/yyyy"
    />
  );
}

export default DatePicker;
