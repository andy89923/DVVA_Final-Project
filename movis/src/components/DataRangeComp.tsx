import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { DateContext } from "../utils/DataContext";

// interface IProps {
//   value: DateValueType;
//   setValue: Dispatch<SetStateAction<DateValueType>>;
// }

const DataRangeComp: React.FC = () => {
  const { dateRange, setDateRange } = useContext(DateContext);

  const handleValueChange = (newValue: DateValueType) => {
    // setTempRange(newValue as { startDate: Date; endDate: Date });
    if (newValue?.startDate != null && newValue?.endDate != null) {
      setDateRange({
        startDate: new Date(newValue.startDate),
        endDate: new Date(newValue.endDate),
      });
    }
  };

  const addYears = (date: Date, years: number) => {
    date.setFullYear(date.getFullYear() + years);
    return date;
  };

  const maxDate =
    dateRange?.startDate != null
      ? addYears(new Date(dateRange.startDate), 2)
      : (new Date("2022-12-31") as Date);

  return (
    <Datepicker
      value={dateRange}
      onChange={handleValueChange}
      showShortcuts={true}
      maxDate={maxDate}
    />
  );
};

export default DataRangeComp;
