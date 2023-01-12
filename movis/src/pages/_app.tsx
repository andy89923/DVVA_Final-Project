import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { createContext, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { DateContext } from "../utils/DataContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: new Date("2021-01-01"),
    endDate: new Date("2022-12-31"),
  });

  return (
    <DateContext.Provider value={{ dateRange, setDateRange }}>
      <Component {...pageProps} />
    </DateContext.Provider>
  );
};

export default api.withTRPC(MyApp);
