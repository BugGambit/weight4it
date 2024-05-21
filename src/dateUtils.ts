export function isToday(date: Date): boolean {
  return date.toDateString() === new Date().toDateString();
}

/**
 * Calculating the no. of days between two dates
 * @param date1
 * @param date2
 * @returns
 */
export function daysBetween(date1: Date, date2: Date): number {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.round(diffInMs / (1000 * 3600 * 24));
  return diffInDays;
}

/**
 * Get the date string in 'YYYY-MM-DD' format
 * @param {Date} date
 * @returns {string} - 'YYYY-MM-DD' format
 */
export function getDateStr(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}
