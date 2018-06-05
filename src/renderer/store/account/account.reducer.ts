import IAccount from './account.interface';
import * as accountActions from './account.actions';

const initialState: { [id: string]: IAccount } = {};

export function AccountReducer(state = initialState, action): { [id: string]: IAccount } {
  switch (action.type) {
    case accountActions.SAVE_NEW_ACCOUNT:
      const { id } = action.payload;
      let newRecord = {};
      newRecord[id] = action.payload;
      return {
        ...state,
        ...newRecord
      }
  }
  return state;
}
