import { IRecord } from '../records/record.interface';

export interface IPendingRecords {
  /**
   * The pending records to save to the account.
   */
  records: IRecord[];

  /**
   * Account the records should be saved to.
   */
  accountId: string;
}
