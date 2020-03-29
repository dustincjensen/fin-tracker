import { AccountType } from '../../store/account/account.type';
import { IRecord } from '../../store/record/record.interface';

export interface IActionPendingRecordsProps
  extends IActionPendingRecordsStateProps,
    IActionPendingRecordsDispatchProps {}

export interface IActionPendingRecordsStateProps {
  /**
   * The name of the account.
   */
  accountName: string;

  /**
   * The type of the account.
   */
  accountType: AccountType;

  /**
   * The path of the imported file.
   */
  filePath: string;

  /**
   * The name of the imported file.
   */
  fileName: string;

  /**
   * The starting balance of the account you are importing to.
   */
  startingBalance: number;

  /**
   * The new records to add to the account.
   */
  newRecords: IRecord[];

  /**
   * The existing records of the account.
   */
  existingRecords: IRecord[];
}

export interface IActionPendingRecordsDispatchProps {
  /**
   * An action to call when the user accepts the imported records.
   */
  accept: (startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) => void;

  /**
   * An action to call when the user declines the imported records.
   */
  clear: () => void;
}
