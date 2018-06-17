import moment, { Moment } from 'moment';

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
 * @param date the date to see if it occurs in the targetYearMonth.
 * @param targetYearMonth the date to get the year and month from.
 */
export function isInYearMonth(date: string, targetYearMonth: string): boolean {
  return isInYearMonthMoment(moment(date), moment(targetYearMonth));
}

/**
 * Private helper method for isInYearMonth
 * Takes Moment formatted dates.
 * @param date the date to see if it occurs in the same year/month as the target. 
 * @param target the date to get the year and month from.
 */
function isInYearMonthMoment(date: Moment, target: Moment): boolean {
  return date.year() === target.year()
    && date.month() === target.month();
}

/**
 * Returns the date formatted as following 'June 16th, 2018'.
 * @param date the date to be formatted.
 */
export function formatDate(date: string): string {
  return moment(date).format('MMM Do');
}
