import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import DatePickerComponent from "react-datepicker";

// Styles
import "react-datepicker/dist/react-datepicker.css";

function DatePicker({ defaultValue, name, placeholder }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);
  const defaultDate = new Date(defaultValue);

  const [startDate, setStartDate] = useState(defaultDate || null);

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
      name={name}
      onChange={(date) => setStartDate(date)}
      className="bg-transparent w-full outline-none text-[#E1E1E6]"
      dateFormat="dd/MM/yyyy"
      placeholderText={placeholder}
    />
  );
}

export default DatePicker;
