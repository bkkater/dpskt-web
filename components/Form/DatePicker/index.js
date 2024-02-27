import React from "react";
import { ConfigProvider, theme } from "antd";
import locale from "antd/locale/pt_BR";

import SimpleDatePicker from "./Simple";
import RangeDatePicker from "./Range";

export default function DatePicker({ children }) {
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#168ac5",
          fontSize: "1rem",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

DatePicker.Range = RangeDatePicker;
DatePicker.Simple = SimpleDatePicker;
