import { IAccount } from '../../store/account/account.interface';

export interface INewRecordsProps extends INewRecordsStateProps, INewRecordsDispatchProps, INewRecordsOwnProps {}

export interface INewRecordsOwnProps {
  /**
   * When navigating from an account we receive an ID,
   * so we can pre-fill the selector.
   */
  accountId: string;
}

export interface INewRecordsStateProps {
  accounts: IAccount[];
}

export interface INewRecordsDispatchProps {
  importAction: (account: IAccount, file) => void;
}
