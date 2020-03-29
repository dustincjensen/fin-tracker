import { IRecord } from '../record/record.interface';

export interface IPendingRecordStore {
  /**
   * The ID of the account to add the records to.
   */
  accountId: string;

  /**
   * The file path of the imported file.
   */
  filePath: string;

  /**
   * The file name of the imported file.
   */
  fileName: string;

  /**
   * Pending records to be uploaded.
   */
  records: IRecord[];
}
