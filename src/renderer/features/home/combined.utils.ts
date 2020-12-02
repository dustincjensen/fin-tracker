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
type TargetConverter = (targetDate: string) => string;

/**
 * Returns a curried function to compare 2 dates.
 *
 * @param fn  The function call with the 2 dates.
 */
const queryBy: (fn: DateQuery, tc: TargetConverter) => DateCurriedQuery = (fn: DateQuery, tc: TargetConverter) => {
  return target => {
    const ct = createDate(tc(target));
    return date => {
      const cd = createDate(date);
      return fn(cd, ct);
    };
  };
};

/**
 * Returns true when the 2 dates are in the same year and month.
 * We receive the target date in format `2019-01` so we append `-01` to get `2019-01-01`.
 */
export const queryByIsInYearAndMonth = queryBy(isInYearMonth, t => `${t}-01`);

/**
 * Returns true when the 2 dates are in the same year.
 * We receive the target date in the format `2019` so we append `-01-01` to get `2019-01-01`.
 */
export const queryByIsInYear = queryBy(isInYear, t => `${t}-01-01`);

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
