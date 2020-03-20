import { IRecord } from './record.interface';

export interface IRecordStore {
  /**
   * Records keyed by the account they belong to.
   */
  records: { [accountId: string]: IRecord[] };
}
