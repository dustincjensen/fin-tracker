import { IStore } from '../store.interface';

export class PendingRecordSelectors {
  /**
   * Return the pending record state.
   *
   * @param state   The current application state.
   */
  public static pendingRecords(state: IStore) {
    return state.pendingRecords;
  }

  /**
   * Returns the error if one exists.
   *
   * @param state   The current application state.
   */
  public static error(state: IStore) {
    return state.pendingRecords.error;
  }

  /**
   * Returns the current pending records.
   *
   * @param state   The current application state.
   */
  public static records(state: IStore) {
    return state.pendingRecords.records;
  }
}
