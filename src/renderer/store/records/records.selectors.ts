import IStore from '../store.interface';
import { isInYearMonth } from '../../utils/date.util';

export function ByAccountId(store: IStore, accountId: string) {
  if (accountId) {
    return store.records.filter(r => r.accountId === accountId);
  }
  return [];
}

export function ByAccountIdAndDate(store: IStore, accountId: string, date: string) {
  if (accountId) {
    return store.records.filter(r =>
      r.accountId === accountId &&
      isInYearMonth(r.date, date)
    );
  }
  return [];
}
