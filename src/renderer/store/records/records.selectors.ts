import { getPreviousMonth, isInYearMonth } from '../../utils/date.util';
import { IStore } from '../store.interface';

export function ByAccountId(store: IStore, accountId: string) {
  if (accountId) {
    return store.records.filter(r => r.accountId === accountId);
  }
  return [];
}

export function ByAccountIdAndDate(store: IStore, accountId: string, date: string) {
  if (accountId) {
    return store.records.filter(r => r.accountId === accountId && isInYearMonth(r.date, date));
  }
  return [];
}

// TODO make better by using the starting balance of the account if the month matches?
export function GetPreviousMonthEndBalance(store: IStore, accountId: string, date: string): number {
  if (accountId) {
    const previousMonth = getPreviousMonth(date);
    const previousMonthRecords = ByAccountIdAndDate(store, accountId, previousMonth);
    const lastRecord = previousMonthRecords[previousMonthRecords.length - 1];
    return lastRecord && lastRecord.balance;
  }
  return null;
}

export function GetCurrentMonthEndBalance(store: IStore, accountId: string, date: string): number {
  if (accountId) {
    const monthsRecords = ByAccountIdAndDate(store, accountId, date);
    const lastRecord = monthsRecords[monthsRecords.length - 1];
    return lastRecord && lastRecord.balance;
  }
  return null;
}
