import { IAccount } from './account.interface';

export class AccountActions {
  public static SAVE_NEW_ACCOUNT = 'SAVE_NEW_ACCOUNT';
  public static UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
  public static DELETE_ACCOUNT = 'DELETE_ACCOUNT';
  public static ARCHIVE_ACCOUNT = 'ARCHIVE_ACCOUNT';

  public static saveNewAccount = (account: IAccount) => ({
    type: AccountActions.SAVE_NEW_ACCOUNT,
    payload: account,
  });

  public static updateAccount = (account: IAccount) => ({
    type: AccountActions.UPDATE_ACCOUNT,
    payload: account,
  });

  public static deleteAccount = (account: IAccount) => ({
    type: AccountActions.DELETE_ACCOUNT,
    payload: account,
  });

  public static archiveAccount = (id: string, archived: boolean, endYear: number, endMonth: number) => ({
    type: AccountActions.ARCHIVE_ACCOUNT,
    payload: {
      id,
      archived,
      endYear,
      endMonth
    }
  });
}
