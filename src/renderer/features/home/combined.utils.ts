import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import {
  allMonthsBetweenDates,
  allYearsBetweenDates,
  createDate,
  getEarliestDate,
  getLatestDate,
  IDate,
  isInYear,
  isInYearMonth,
} from '../../utils/date.utils';

type DateQuery = (target: IDate, date: IDate) => boolean;
export type DateCurriedQuery = (target: string) => (date: string) => boolean;

/**
 * Returns a curried function to compare 2 dates.
 * 
 * @param fn  The function call with the 2 dates.
 */
const queryBy: (fn: DateQuery) => DateCurriedQuery = (fn: DateQuery) => {
  return target => {
    const ct = createDate(target);
    return date => {
      const cd = createDate(date);
      return fn(cd, ct);
    };
  };
};

/**
 * Returns true when the 2 dates are in the same year and month.
 */
export const queryByIsInYearAndMonth = queryBy(isInYearMonth);

/**
 * Returns true when the 2 dates are in the same year.
 */
export const queryByIsInYear = queryBy(isInYear);

/**
 * Gets the displayable months for a set of accounts and records.
 */
export const displayMonthDates = createSelector(
  AccountSelectors.accounts,
  RecordSelectors.records,
  (accounts, records) => {
    const startingDates = Object.keys(accounts).map(id => {
      const { startYear, startMonth } = accounts[id];
      // TODO fix typing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return `${startYear}-${parseInt(startMonth as any) + 1}`;
    });

    const endDates = Object.keys(accounts).map(id => {
      const accountRecords = records[id];
      return accountRecords?.[accountRecords.length - 1].date;
    });

    return allMonthsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
  }
);

/**
 * Gets the displayable years for a set of accounts and records.
 */
export const displayYearDates = createSelector(
  AccountSelectors.accounts,
  RecordSelectors.records,
  (accounts, records) => {
    const startingDates = Object.keys(accounts).map(id => {
      const { startYear } = accounts[id];
      return `${startYear}-12-01`;
    });

    const endDates = Object.keys(accounts).map(id => {
      const accountRecords = records[id];
      return accountRecords?.[accountRecords.length - 1].date;
    });

    return allYearsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
  }
);
