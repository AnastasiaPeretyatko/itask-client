/* eslint-disable @typescript-eslint/no-explicit-any */
import { ru } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

type DatePickerType = {
  value: Date | DateRange | undefined;
  onChange: (value: Date | DateRange) => void;
  mode?: 'single'| 'multiple'|'range';
};

const DatePicker = ({ onChange, value, mode = 'single' }: DatePickerType) => {
  return (
    <DayPicker
      animate
      mode={mode}
      selected={value}
      onSelect={onChange}
      locale={ru}
      required
    />
  );
};

export default DatePicker;