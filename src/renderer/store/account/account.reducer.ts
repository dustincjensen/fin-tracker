import { produce } from 'immer';
import * as accountActions from './account.actions';
import { IAccount } from './account.interface';

const initialState: { [id: string]: IAccount } = {};

export const AccountReducer = produce((state, action) => {
  switch (action.type) {
    case accountActions.SAVE_NEW_ACCOUNT: {
      saveNewAccount(state, action);
      break;
    }
    case accountActions.DELETE_ACCOUNT: {
      deleteAccount(state, action);
      break;
    }
  }
}, initialState);

function saveNewAccount(state, action) {
  const { id } = action.payload;
  state[id] = action.payload;
}

function deleteAccount(state, action) {
  delete state[action.payload];
}
