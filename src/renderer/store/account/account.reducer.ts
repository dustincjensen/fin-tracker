import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { AccountActions } from './account.actions';
import { IAccount } from './account.interface';
import { IAccountStore } from './account.store.interface';

const initialState: IAccountStore = { accounts: {} };

export const AccountReducer = createDraftReducer(
  {
    [AccountActions.SAVE_NEW_ACCOUNT]: saveNewAccount,
    [AccountActions.UPDATE_ACCOUNT]: updateAccount,
    [AccountActions.DELETE_ACCOUNT]: deleteAccount,
    [AccountActions.ARCHIVE_ACCOUNT]: archiveAccount,
  },
  initialState
);

function saveNewAccount(draft: Draft<IAccountStore>, newAccount: IAccount) {
  const { id } = newAccount;
  draft.accounts[id] = newAccount;
}

function updateAccount(draft: Draft<IAccountStore>, updatedAccount: IAccount) {
  const { id } = updatedAccount;
  if (!draft.accounts[id]) {
    throw Error('Account does not exist.');
  }
  draft.accounts[id] = updatedAccount;
}

function deleteAccount(draft: Draft<IAccountStore>, deletedAccount: IAccount) {
  delete draft.accounts[deletedAccount.id];
}

function archiveAccount(
  draft: Draft<IAccountStore>,
  payload: { id: string; archived: boolean; endYear: number; endMonth: number }
) {
  const { id, archived, endYear, endMonth } = payload;
  const account = draft.accounts[id];
  account.archived = archived;
  account.endYear = endYear;
  account.endMonth = endMonth;
}
