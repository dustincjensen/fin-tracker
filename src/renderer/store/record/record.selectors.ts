import { getAccountStartDate } from '../../utils/account.utils';
import { createDate, getPreviousMonth, isInYearMonth } from '../../utils/date.utils';
import { AccountSelectors } from '../account/account.selectors';
import { IStore } from '../store.interface';
import { IRecord } from './record.interface';

export class RecordSelectors {
  /**
   * Returns all records.
   *
   * @param state   The current application state.
   */
  public static records(state: IStore) {
    return state.records.records;
  }

  /**
   * Returns the records for a specific account.
   *
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   */
  public static recordsByAccountId(state: IStore, accountId: string): IRecord[] {
    return state.records.records[accountId];
  }

  /**
   * Returns the records for a specific account in the given year and month.
   * TODO this creates a new array every time it is used.
   *
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   * @param date        The year/month to get records for.
   */
  public static recordsByDate(state: IStore, accountId: string, date: string): IRecord[] {
    const records = state.records.records[accountId];
    const targetDate = createDate(date);
    return records?.filter(r => isInYearMonth(targetDate, createDate(r.date)));
  }

  /**
   * Returns the balance of the account up to the end of the month before the given year and month.
   *
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   * @param date        The year/month to get the balance for.
   */
  public static previousMonthEndBalance(state: IStore, accountId: string, date: string): number {
    const previousMonth = getPreviousMonth(date);
    const previousMonthRecords = RecordSelectors.recordsByDate(state, accountId, previousMonth);
    if (previousMonthRecords.length > 0) {
      return previousMonthRecords[previousMonthRecords.length - 1]?.balance;
    }

    // The month before the provided date did not have records. Try again with the month
    // before the previous month, but only if we are still after the start date of the account.
    const account = AccountSelectors.account(state, accountId);
    const accountStartDate = createDate(getAccountStartDate(account.startYear, account.startMonth));

    if (accountStartDate <= createDate(previousMonth)) {
      return RecordSelectors.previousMonthEndBalance(state, accountId, previousMonth);
    } else {
      return undefined;
    }
  }

  /**
   * Returns the balance of the account up to the end of the given year and month.
   *
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   * @param date        The year/month to get the balance for.
   */
  public static currentMonthEndBalance(state: IStore, accountId: string, date: string): number {
    const monthsRecords = RecordSelectors.recordsByDate(state, accountId, date);
    if (monthsRecords.length > 0) {
      return monthsRecords[monthsRecords.length - 1]?.balance;
    }

    // The month did not have records. Try again with the previous month,
    // but only if we are still after the start date of the account.
    const account = AccountSelectors.account(state, accountId);
    const accountStartDate = createDate(getAccountStartDate(account.startYear, account.startMonth));
    const previousMonth = getPreviousMonth(date);

    if (accountStartDate <= createDate(previousMonth)) {
      return RecordSelectors.currentMonthEndBalance(state, accountId, previousMonth);
    } else {
      return undefined;
    }
  }

  /**
   * Returns the balance of the last record in the account.
   * This should be the account balance.
   *
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   */
  public static currentBalance(state: IStore, accountId: string): number {
    const records = RecordSelectors.recordsByAccountId(state, accountId);
    return records?.[records.length - 1]?.balance;
  }
}
