import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { AccountActions } from './account.actions';
import { IAccount } from './account.interface';
import { IAccountStore } from './account.store.interface';

const initialState: IAccountStore = { accounts: {} };

export const AccountReducer = createDraftReducer(
  {
    [AccountActions.LOAD_ACCOUNTS]: loadAccounts,
    [AccountActions.SAVE_NEW_ACCOUNT]: saveNewAccount,
    [AccountActions.UPDATE_ACCOUNT]: updateAccount,
    [AccountActions.DELETE_ACCOUNT]: deleteAccount,
  },
  initialState
);

function loadAccounts(draft: Draft<IAccountStore>, accounts: IAccount[]) {
  for (const account of accounts) {
    draft.accounts[account.id] = account;
  }
}

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
