import { IAccount } from './account.interface';

export class AccountActions {
  public static SAVE_NEW_ACCOUNT = 'SAVE_NEW_ACCOUNT';
  public static DELETE_ACCOUNT = 'DELETE_ACCOUNT';

  public static saveNewAccount = (account: IAccount) => ({
    type: AccountActions.SAVE_NEW_ACCOUNT,
    payload: account,
  });

  public static deleteAccount = (id: string) => ({
    type: AccountActions.DELETE_ACCOUNT,
    payload: id,
  });
}
