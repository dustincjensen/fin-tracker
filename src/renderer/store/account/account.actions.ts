import { IAccount } from './account.interface';

// Action constants
export const SAVE_NEW_ACCOUNT = 'SAVE_NEW_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

// Action creators
export function SaveNewAccount(account: IAccount) {
  return {
    type: SAVE_NEW_ACCOUNT,
    payload: account,
  };
}

export function DeleteAccount(id: string) {
  return {
    type: DELETE_ACCOUNT,
    payload: id,
  };
}
