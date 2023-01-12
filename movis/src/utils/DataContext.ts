import { createContext } from "react";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";

export const DateContext = createContext<{
    dateRange: DateValueType;
    setDateRange: React.Dispatch<React.SetStateAction<DateValueType>>;
  }>(null);