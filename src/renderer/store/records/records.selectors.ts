import IStore from '../store.interface';

export function ByAccountId(store: IStore, accountId: string) {
  if (accountId) {
    return store.records.filter(r => r.accountId === accountId);
  }
  return [];
} 
