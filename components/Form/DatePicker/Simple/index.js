import React, { forwardRef } from "react";
import { DatePicker as DatePickerComponent } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

// Components
import InputGroup from "@/components/Form/InputGroup";

const DatePickerUI = DatePickerComponent.generatePicker(dateFnsGenerateConfig);

function SimplePickerComponent(
  {
    name,
    label,
    value,
    onChange,
    className,
    styleType,
    error = null,
    icon = null,
    ...rest
  },
  ref,
) {
  return (
    <InputGroup
      label={label}
      icon={icon}
      error={error}
      styleType={styleType}
      className={className}
    >
      <DatePickerUI
        className="h-12 w-64 border-transparent bg-transparent px-3 focus-within:shadow-none focus:shadow-none"
        placeholder="Selecione uma data"
        format="DD/MM/YYYY"
        getPopupContainer={(trigger) => trigger.parentElement}
        disabledDate={(current) => current && current > new Date()}
        ref={ref}
        value={new Date(value)}
        onChange={onChange}
        suffixIcon={null}
        superNextIcon={null}
        superPrevIcon={null}
        showToday={false}
        {...rest}
      />
    </InputGroup>
  );
}

const SimplePicker = forwardRef(SimplePickerComponent);

export default SimplePicker;
