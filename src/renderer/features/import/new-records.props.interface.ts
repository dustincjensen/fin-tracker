import { IAccount } from '../../store/account/account.interface';
import { ParseType } from '../../store/pending-record/parse.type';

export interface INewRecordsProps extends INewRecordsStateProps, INewRecordsDispatchProps, INewRecordsOwnProps {}

export interface INewRecordsStateProps {
  accounts: IAccount[];

  /**
   * The error that occurred when trying to import, if any.
   */
  error: string;
}

export interface INewRecordsDispatchProps {
  importAction: (account: IAccount, file, importMethod: ParseType) => void;
}

export interface INewRecordsOwnProps {
  /**
   * When navigating from an account we receive an ID,
   * so we can pre-fill the selector.
   */
  accountId: string;
}
