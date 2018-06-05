import IAccount from "./account.interface";

// Action constants
export const SAVE_NEW_ACCOUNT = 'SAVE_NEW_ACCOUNT';

// Action creators
export function SaveNewAccount(account: IAccount) {
  return {
    type: SAVE_NEW_ACCOUNT,
    payload: account
  };
}
