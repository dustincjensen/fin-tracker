import moment from 'moment';

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

/*

const moment = require('moment');

const monthNames = moment.localeData().months();
const monthIndex = moment('2018-06-01').month();
const monthName = monthNames[monthIndex];
console.log(monthNames);
console.log(`2018-06-01 is ${monthName}`, monthName === monthNames[5]);

const dates = [
    '2017-05-04',
    '2017-06-24',
    '2018-05-31',
    '2018-06-01',
    '2018-06-08',
    '2018-06-11',
    '2018-06-12',
    '2018-06-15',
    '2018-06-15',
    '2018-06-17',
    '2018-06-18',
    '2018-06-21',
    '2018-06-25',
    '2018-06-26',
    '2018-06-26',
    '2018-06-26',
    '2018-06-28',
    '2018-06-29',
    '2018-06-30',
    '2018-07-01'
];

function isInYearMonth(target, date) {
    return date.year() === target.year()
        && date.month() === target.month();
}

function filterByMonth(dates, targetYearMonth) {
    return dates.filter(date => {
        return isInYearMonth(targetYearMonth, date);
    });
}

function filterByMonth_Strings(dates, targetYearMonth) {
    return filterByMonth(
        dates.map(d => moment(d)),
        moment(targetYearMonth)
    );
}

console.log(
    filterByMonth_Strings(dates, '2018-06-01')
        .map(md => md.format('MMMM D, YYYY'))
);

*/
