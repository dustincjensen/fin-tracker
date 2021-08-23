import moment, { isMoment, Moment } from 'moment';

export interface IDate {
  year: () => number;
  month: () => number;
}

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
 * Creates a new IDate.
 *
 * @param date  The date to create.
 */
export function createDate(date: string): IDate {
  return moment(date);
}

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
 * @param target  the date to get the year and month from.
 * @param date    the date to see if it occurs in the same year/month as the target.
 */
export function isInYearMonth(target: IDate, date: IDate): boolean {
  return date.year() === target.year() && date.month() === target.month();
}

/**
 * True if the date falls within the target year; false otherwise.
 *
 * @param target  the date to get the year from.
 * @param date    the date to see if it occurs in the same year as the target.
 */
export function isInYear(target: IDate, date: IDate): boolean {
  return date.year() === target.year();
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
 * Returns the date formatted as following 'June 16, 2018'.
 *
 * @param date  the date to be formatted.
 */
export function formatDateFull(date: string | Moment): string {
  if (isMoment(date)) {
    return date.format('LL');
  }
  return moment(date).format('LL');
}

/**
 * Returns the date formatted as following 'Jun 2018'.
 *
 * @param date  the date to be formatted.
 */
export function formatDateMonthYear(date: string): string {
  return moment(date).format('MMM YYYY');
}

/**
 * Returns a string representing a date in the previous month.
 *
 * @param date  the date to find the previous month of.
 */
export function getPreviousMonth(date: string): string {
  return moment(date).subtract(1, 'months').toISOString();
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
export function stringToDayMonthYear(date: string): string {
  return moment(date).format('D MMM YYYY');
}

/**
 * Returns the date in the format of 'Feb 2020'.
 *
 * @param date  the date to convert to the new date format.
 */
export function stringToMonthYear(date: string): string {
  return moment(date).format('MMM YYYY');
}

/**
 * Returns a list of date strings, one for each month between two dates.
 * Start and end dates are inclusive.
 *
 * @param start   The start date.
 * @param end     the end date.
 */
export function allMonthsBetweenDates(start: string | Moment, end: string | Moment): string[] {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('YYYY-MM'));
    dateStart.add(1, 'month');
  }

  return timeValues;
}

/**
 * Returns a list of date strings, one for each year between two dates.
 * Start and end dates are inclusive.
 *
 * @param start   The start date.
 * @param end     The end date.
 */
export function allYearsBetweenDates(start: string | Moment, end: string | Moment): string[] {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format('YYYY') === dateEnd.format('YYYY')) {
    timeValues.push(dateStart.format('YYYY'));
    dateStart.add(1, 'year');
  }

  return timeValues;
}

/**
 * Returns the earliest date from a list of date strings.
 *
 * @param dates   the dates to check.
 */
export function getEarliestDate(dates: string[]) {
  return moment.min(dates.filter(d => d).map(d => moment(d)));
}

/**
 * Returns the latest date from a list of date strings.
 *
 * @param dates   the dates to check.
 */
export function getLatestDate(dates: string[]) {
  return moment.max(dates.filter(d => d).map(d => moment(d)));
}

/**
 * Returns a date in YYYY-MM-DD format for Open Exchange Rate API.
 * 
 * @param date  The date to format.
 */
export function getDateForOer(date: string): string {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * Returns a date in YYYY-MM-DD format for Open Exchange Rate API
 * rounded up to the end of the month.
 * 
 * @param date  The date to format.
 */
export function getMonthDateForOer(date: string): string {
  const endOfMonth = moment(date).endOf('month');
  const today = moment();

  if (endOfMonth > today) {
    return today.format('YYYY-MM-DD');
  }
  return endOfMonth.format('YYYY-MM-DD');
}

/**
 * Returns a date in YYYY-MM-DD format for Open Exchange Rate API
 * rounded up to the end of the year.
 * 
 * @param date  The date to format.
 */
export function getYearDateForOer(date: string): string {
  const endOfYear = moment(date).endOf('year');
  const today = moment();

  if (endOfYear > today) {
    return today.format('YYYY-MM-DD');
  }
  return endOfYear.format('YYYY-MM-DD');
}

// TODO remove?
export function getDateFromTimestamp(timestamp: number): string {
  return moment(timestamp).format('YYYY-MM-DD');
}