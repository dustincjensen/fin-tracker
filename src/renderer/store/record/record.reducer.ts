import { Draft } from 'immer';
import { AccountActions } from '../account/account.actions';
import { createDraftReducer } from '../draft.reducer';
import { RecordActions } from './record.actions';
import { IRecord } from './record.interface';
import { IRecordStore } from './record.store.interface';

const initialState: IRecordStore = { records: {} };

export const RecordReducer = createDraftReducer(
  {
    [RecordActions.SAVE_NEW_RECORDS]: saveNewRecords,
    [AccountActions.DELETE_ACCOUNT]: deleteRecords,
  },
  initialState
);

/**
 * Saves records to an account.
 *
 * @param draft     The draft state.
 * @param records   The full list of our account records.
 */
function saveNewRecords(draft: Draft<IRecordStore>, records: IRecord[]) {
  if (records && records.length > 0) {
    const accountId = records[0]?.accountId;
    draft.records[accountId] = records;
  }
}

/**
 * Deletes records associated to an account.
 *
 * @param draft       The draft state.
 * @param accountId   The account id to delete records for.
 */
function deleteRecords(draft: Draft<IRecordStore>, accountId: string) {
  delete draft.records[accountId];
}
