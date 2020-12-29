export function currentYear(): number {
  return new Date().getFullYear();
}

export function getDaysInMonth(month: number, year: number) {
  // Here January is 0 based
  // Day 0 is the last day in the previous month
  return new Date(year, month + 1, 0).getDate();
}

export function hasSameYearMonthDate(date1: Date, date2: Date) {
  return date1.toLocaleDateString() === date2.toLocaleDateString();
}

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateToYMD(date: Date) {
  const strArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = date.getDate();
  const m = strArray[date.getMonth()];
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}
