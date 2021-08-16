import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { InvestmentRecordSelectors } from '../../store/investment-record/investment-record.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { getAccountStartDate } from '../../utils/account.utils';
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
  InvestmentRecordSelectors.records,
  (accounts, records, investmentRecords) => {
    const startingDates = Object.keys(accounts).map(id => {
      // TODO nothing stops a record, or investment record from appearing earlier than the start date of the account.
      const { startYear, startMonth } = accounts[id];
      return getAccountStartDate(startYear, startMonth);
    });

    const endDates = Object.keys(accounts)
      .map(id => {
        const accountRecords = records[id];
        const investRecords = investmentRecords[id];
        return [
          accountRecords?.[accountRecords.length - 1].date,
          // TODO the last record, isn't necessarily the oldest record.......
          investRecords?.[investRecords.length - 1].date
        ];
      })
      .reduce((prev: string[], curr: string[]) => [...prev, ...curr], []);

    return allMonthsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
  }
);

/**
 * Gets the displayable years for a set of accounts and records.
 */
export const displayYearDates = createSelector(
  AccountSelectors.accounts,
  RecordSelectors.records,
  InvestmentRecordSelectors.records,
  (accounts, records, investmentRecords) => {
    const startingDates = Object.keys(accounts).map(id => {
      // TODO nothing stops a record, or investment record from appearing earlier than the start date of the account.
      const { startYear } = accounts[id];
      return `${startYear}-12-01`;
    });

    const endDates = Object.keys(accounts)
      .map(id => {
        const accountRecords = records[id];
        const investRecords = investmentRecords[id];
        return [
          accountRecords?.[accountRecords.length - 1].date,
          // TODO the last record, isn't necessarily the oldest record.......
          investRecords?.[investRecords.length - 1].date,
        ];
      })
      .reduce((prev: string[], curr: string[]) => [...prev, ...curr], []);

    return allYearsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
  }
);
