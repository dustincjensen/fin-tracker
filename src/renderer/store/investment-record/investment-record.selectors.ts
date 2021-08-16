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
}
