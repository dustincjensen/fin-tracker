import moment, { Moment } from 'moment';

export const monthValues = [
  { value: '0', month: 'January' },
  { value: '1', month: 'February' },
  { value: '2', month: 'March' },
  { value: '3', month: 'April' },
  { value: '4', month: 'May' },
  { value: '5', month: 'June' },
  { value: '6', month: 'July' },
  { value: '7', month: 'August' },
  { value: '8', month: 'September' },
  { value: '9', month: 'October' },
  { value: '10', month: 'November' },
  { value: '11', month: 'December' },
];

/**
 * Get the long month names.
 * eg) January, February...
 */
export function monthNamesLong() {
  return moment.localeData().months();
}

/**
 * Get the short month names.
 * eg) Jan, Feb, Mar...
 */
export function monthNamesShort() {
  return moment.localeData().monthsShort();
}

/**
 * True if the date falls within the target year and month; false otherwise.
 *
 * @param date              the date to see if it occurs in the targetYearMonth.
 * @param targetYearMonth   the date to get the year and month from.
 */
export function isInYearMonth(date: string, targetYearMonth: string): boolean {
  return isInYearMonthMoment(moment(date), moment(targetYearMonth));
}

/**
 * Private helper method for isInYearMonth
 * Takes Moment formatted dates.
 *
 * @param date    the date to see if it occurs in the same year/month as the target.
 * @param target  the date to get the year and month from.
 */
function isInYearMonthMoment(date: Moment, target: Moment): boolean {
  return date.year() === target.year() && date.month() === target.month();
}

/**
 * Returns the date formatted as following 'Jun 16th'.
 *
 * @param date  the date to be formatted.
 */
export function formatDate(date: string): string {
  return moment(date).format('MMM D');
}

/**
 * Returns the date formatted as following 'June 16th, 2018'.
 *
 * @param date  the date to be formatted.
 */
export function formatDateFull(date: string): string {
  return moment(date).format('LL');
}

/**
 * Returns a string representing a date in the previous month.
 *
 * @param date  the date to find the previous month of.
 */
export function getPreviousMonth(date: string): string {
  return moment(date)
    .subtract(1, 'months')
    .toISOString();
}

/**
 * Returns an array of the month and year numbers.
 *
 * @param date  the date to find the month and year of.
 */
export function getMonthAndYearFromDate(date: string): number[] {
  const d = moment(date);
  return [d.month(), d.year()];
}

/**
 * Returns the year number from the date.
 *
 * @param date  the date to find the year of.
 */
export function getYearFromDate(date: string): number {
  return moment(date).year();
}

/**
 * Returns the date in the format of '1 Feb 2020'.
 *
 * @param date  the date to convert to the new date format.
 */
export function stringToString(date: string): string {
  return moment(date).format('D MMM YYYY');
}
