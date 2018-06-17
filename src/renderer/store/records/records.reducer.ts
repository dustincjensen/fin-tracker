import { IRecord } from './record.interface';
import * as recordsActions from './records.actions';
import * as accountActions from '../account/account.actions';

const initialState: IRecord[] = [];

// TODO modify records reducer state to be indexed by account id?
export function RecordsReducer(state = initialState, action): IRecord[] {
  switch (action.type) {
    case recordsActions.SAVE_NEW_RECORDS:
      // Get the records and check if they were any returned.
      const records = action.payload;
      if (!records || records.length === 0) {
        return state;
      }
      // Take the account id from the new records, because we want to filter
      // out those records when updating our state.
      const excludeAccountId = records[0] && records[0].accountId;
      const otherAccountsRecords = state.filter(r => r.accountId !== excludeAccountId);
      return [
        ...(otherAccountsRecords || []),
        ...records
      ];
    case accountActions.DELETE_ACCOUNT:
      const accountId = action.payload;
      return [
        ...state.filter(r => r.accountId !== accountId)
      ];
  }
  return state;
}
