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
  ref
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
        className="h-12 bg-transparent border-transparent px-3 w-64 focus:shadow-none focus-within:shadow-none"
        placeholder="Selecione uma data"
        suffixIcon={null}
        superNextIcon={null}
        superPrevIcon={null}
        showToday={false}
        getPopupContainer={(trigger) => trigger.parentElement}
        format="DD/MM/YYYY"
        ref={ref}
        value={new Date(value)}
        onChange={onChange}
        {...rest}
      />
    </InputGroup>
  );
}

const SimplePicker = forwardRef(SimplePickerComponent);

export default SimplePicker;
