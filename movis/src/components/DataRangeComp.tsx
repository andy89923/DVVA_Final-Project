import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";

interface IProps {
  value: DateValueType;
  setValue: Dispatch<SetStateAction<DateValueType>>;
}

const DataRangeComp: React.FC<IProps> = (props) => {
  const handleValueChange = (newValue: DateValueType) => {
    props.setValue(newValue);
  };

  const addYears = (date: Date, years: number) => {
    date.setFullYear(date.getFullYear() + years);
    return date;
  };

  const maxDate =
    props.value?.startDate != null
      ? addYears(new Date(props.value.startDate), 2)
      : (new Date("2022-12-31") as Date);

  return (
    <Datepicker
      value={props.value}
      onChange={handleValueChange}
      showShortcuts={true}
      maxDate={maxDate}
    />
  );
};

export default DataRangeComp;
