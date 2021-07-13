import { IAccount } from "../../../store/account/account.interface";
import { IRecord } from "../../../store/record/record.interface";

export interface ITransferHistoryRecordProps {
  /**
   * The record that was transfered to the investment account.
   */
  record: IRecord & {
    /**
     * The name of the account transfered from.
     */
    accountName: string;
  };

  /**
   * The investment account.
   */
  account: IAccount;
}