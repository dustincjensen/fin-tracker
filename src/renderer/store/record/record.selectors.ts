import { getPreviousMonth, isInYearMonth } from '../../utils/date.utils';
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
    return records?.filter(r => isInYearMonth(r.date, date));
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
    return previousMonthRecords?.pop()?.balance;
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
    return monthsRecords?.pop()?.balance;
  }
}
