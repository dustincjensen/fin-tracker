import { createDate } from '../../utils/date.utils';
import { IStore } from '../store.interface';

export class InvestmentRecordSelectors {
  /**
   * Returns all records.
   *
   * @param state   The current application state.
   */
  public static records(state: IStore) {
    return state.investmentRecords.records;
  }

  /**
   * Returns the records for a specific account.
   * 
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   */
  public static recordsByAccountId(state: IStore, accountId: string) {
    return state.investmentRecords.records[accountId];
  }

  /**
   * Returns the balance of the last record in the account.
   * This should be the account balance.
   *
   * @param state       The current application state.
   * @param accountId   The ID of the account.
   */
  public static balance(state: IStore, accountId: string): number {
    const records = InvestmentRecordSelectors.recordsByAccountId(state, accountId);

    const investRecords = records ? [...records] : [];
    investRecords.sort((a, b) => createDate(a.date) > createDate(b.date) ? 1 : -1);

    const cadBalance = investRecords?.filter(r => r.investmentCurrency === 'CAD').pop()?.balance;
    const usdBalance = investRecords?.filter(r => r.investmentCurrency === 'USD').pop()?.balance;

    return cadBalance || usdBalance;
  }
}
