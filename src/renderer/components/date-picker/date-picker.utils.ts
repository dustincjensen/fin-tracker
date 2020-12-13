import moment from 'moment';
import { monthNamesLong } from '../../utils/date.utils';
import { DisplayableCalendarDate } from './displayable-calendar-date.type';

// TODO remove moment references for IDate and date.utils methods.
export function buildMonth(start: moment.Moment) {
  const months = monthNamesLong();
  const year = start.year();
  const month = start.month();

  const accum = moment(`${year}-${month + 1}-01`);
  const startingDay = accum.day();
  const monthYear = `${months[accum.month()]} ${accum.year()}`;

  // Add any days that show up in front of the 1st of the month (if it does not start on Sunday).
  const previousMonthDates: DisplayableCalendarDate[] = [];
  if (startingDay !== 0) {
    const backwards = moment(accum);
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = backwards.subtract(1, 'd');
      previousMonthDates.unshift({
        iso: day.toISOString(),
        date: day.date(),
      });
    }
  }

  // Put first of month into the current month list
  const monthDates: DisplayableCalendarDate[] = [
    {
      iso: accum.toISOString(),
      date: accum.date(),
    },
  ];

  // Get all the days for the current month.
  for (let i = 1; i < accum.daysInMonth(); i++) {
    const day = accum.add(1, 'd');
    monthDates.push({
      iso: day.toISOString(),
      date: day.date(),
    });
  }

  // Add any days that show up after the last of the month (if it does not end on a Saturday).
  const nextMonthDates: DisplayableCalendarDate[] = [];
  const totalDaysSoFar = previousMonthDates.length + monthDates.length;
  if (totalDaysSoFar < 42) {
    for (let i = 0; i < 42 - totalDaysSoFar; i++) {
      const day = accum.add(1, 'd');
      nextMonthDates.push({
        iso: day.toISOString(),
        date: day.date(),
      });
    }
  }

  return {
    monthYear,
    startingDay,
    previousDates: previousMonthDates,
    dates: monthDates,
    nextDates: nextMonthDates,
  };
}
