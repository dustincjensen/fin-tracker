import { IRecord } from '../record/record.interface';

export interface IPendingRecordStore {
  /**
   * The ID of the account to add the records to.
   */
  accountId: string;

  /**
   * Pending records to be uploaded.
   */
  records: IRecord[];
}
