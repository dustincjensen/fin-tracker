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
    [RecordActions.SET_RECORD_CATEGORY]: setRecordCategory,
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
 * Sets the category on a record.
 *
 * @param draft     The draft state.
 * @param payload   The payload containing the account, record and the category for the record.
 */
function setRecordCategory(
  draft: Draft<IRecordStore>,
  payload: { accountId: string; recordId: string; categoryId: string }
) {
  const { accountId, recordId, categoryId } = payload;
  draft.records[accountId].find(record => record.id === recordId).categoryId = categoryId;
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
