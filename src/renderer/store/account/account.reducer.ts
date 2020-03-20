import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { AccountActions } from './account.actions';
import { IAccount } from './account.interface';
import { IAccountStore } from './account.store.interface';

const initialState: IAccountStore = { accounts: {} };

export const AccountReducer = createDraftReducer(
  {
    [AccountActions.SAVE_NEW_ACCOUNT]: saveNewAccount,
    [AccountActions.DELETE_ACCOUNT]: deleteAccount,
  },
  initialState
);

function saveNewAccount(draft: Draft<IAccountStore>, newAccount: IAccount) {
  const { id } = newAccount;
  draft.accounts[id] = newAccount;
}

function deleteAccount(draft: Draft<IAccountStore>, id: string) {
  delete draft.accounts[id];
}
