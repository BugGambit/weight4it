export function isToday(date: Date): boolean {
  return date.toDateString() === new Date().toDateString();
}

/**
 * // Calculating the no. of days between two dates
 * @param date1
 * @param date2
 * @returns
 */
export function daysBetween(date1: Date, date2: Date): number {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.round(diffInMs / (1000 * 3600 * 24));
  return diffInDays;
}
