import React, { forwardRef } from "react";
import { DatePicker as DatePickerComponent } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

// Components
import InputGroup from "@/components/Form/InputGroup";

const DatePickerUI = DatePickerComponent.generatePicker(dateFnsGenerateConfig);

function RangePickerComponent(
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
      <DatePickerUI.RangePicker
        className="h-12 bg-transparent border-transparent px-3 w-64 focus:shadow-none focus-within:shadow-none"
        placeholder={["Data inicial", "Data final"]}
        suffixIcon={null}
        superNextIcon={null}
        superPrevIcon={null}
        getPopupContainer={(trigger) => trigger.parentElement}
        format="DD/MM/YYYY"
        ref={ref}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </InputGroup>
  );
}

const RangePicker = forwardRef(RangePickerComponent);

export default RangePicker;
