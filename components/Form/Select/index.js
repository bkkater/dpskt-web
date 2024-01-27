import React, { useEffect, useRef, useId } from "react";
import SelectComponent from "react-select";
import { useField } from "@unform/core";

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    borderColor: "transparent !important",
    boxShadow: "transparent",
    outline: "none",
    color: "white",
  }),
  container: (styles) => ({
    ...styles,
    width: "100%",
    outline: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#121214",
    color: "white",
  }),
  menuList: (styles) => ({
    ...styles,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? "#2274A5" : "transparent",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#737373",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
  }),
};

function Select({ options, name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => ref.state.selectValue[0]?.label,
      setValue: (ref, value) => {
        ref.setValue(value || null);
      },
      clearValue: (ref) => {
        ref.clearValue();
      },
    });
  }, [fieldName, registerField]);

  return (
    <SelectComponent
      ref={selectRef}
      options={options}
      defaultValue={defaultValue}
      styles={customStyles}
      instanceId={useId()}
      {...rest}
    />
  );
}

export default Select;
