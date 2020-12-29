import React, { useEffect, useState } from 'react';
import Dropdown from 'components/Dropdown/Dropdown';
import range from 'lodash/range';
import { getDaysInMonth, hasSameYearMonthDate } from 'utils/datetime';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface DateInputProps {
  value: Date;
  minYear: number;
  maxYear: number;
  onChange?: (date: Date) => void;
  style?: React.CSSProperties;
  required?: boolean;
}

function DateInput({
  value,
  minYear,
  maxYear,
  onChange = () => {},
  style,
  required,
}: DateInputProps) {
  const [year, setYear] = useState<null | number>(null);
  const [month, setMonth] = useState<null | number>(null);
  const [day, setDay] = useState<null | number>(null);

  useEffect(() => {
    if (!value) {
      setYear(null);
      setMonth(null);
      setDay(null);
      return;
    }
    setYear(value.getFullYear());
    setMonth(value.getMonth());
    setDay(value.getDate());
  }, [value]);

  const triggerOnChangeIfChanged = (
    y: number | null,
    m: number | null,
    d: number | null
  ) => {
    // check if d > numberOfDays(month)
    if (m !== null && d !== null) {
      const numberOfDays = getDaysInMonth(m, y || 2020);
      if (d > numberOfDays) {
        setDay(numberOfDays);
        triggerOnChangeIfChanged(y, m, numberOfDays);
        return;
      }
    }

    if (y === null || m === null || d === null) return;
    const date = new Date(y, m, d);
    if (value === undefined || !hasSameYearMonthDate(date, value)) {
      onChange(date);
    }
  };

  const years = range(maxYear, minYear).map(String);
  const numberOfDays =
    month !== null ? getDaysInMonth(month, year || 2020) : 31;
  const days = range(1, numberOfDays + 1).map(String);

  const onYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = Number(event.target.value);
    setYear(selectedYear);
    triggerOnChangeIfChanged(selectedYear, month, day);
  };

  const onMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = months.findIndex((el) => el === event.target.value);
    setMonth(selectedMonth);
    triggerOnChangeIfChanged(year, selectedMonth, day);
  };

  const onDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = Number(event.target.value);
    setDay(selectedDay);
    triggerOnChangeIfChanged(year, month, selectedDay);
  };

  return (
    <div style={style}>
      <Dropdown
        value={year != null ? `${year}` : undefined}
        placeholder="Year"
        options={years}
        onChange={onYearChange}
        required={required}
      />
      <Dropdown
        value={month != null ? months[month] : undefined}
        placeholder="Month"
        options={months}
        onChange={onMonthChange}
        style={{ margin: '0 5px' }}
        required={required}
      />
      <Dropdown
        value={day != null ? `${day}` : undefined}
        placeholder="Day"
        options={days}
        onChange={onDayChange}
        required={required}
      />
    </div>
  );
}
DateInput.defaultProps = {} as Partial<DateInputProps>;

export default DateInput;
