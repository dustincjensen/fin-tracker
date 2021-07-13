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
}
