import { Draft } from 'immer';
import { AccountActions } from '../account/account.actions';
import { createDraftReducer } from '../draft.reducer';
import { RecordActions } from './record.actions';
import { IRecord } from './record.interface';
import { IRecordStore } from './record.store.interface';
import { ISplitRecord } from './split-record.interface';

const initialState: IRecordStore = { records: {} };

export const RecordReducer = createDraftReducer(
  {
    [RecordActions.SAVE_NEW_RECORDS]: saveNewRecords,
    [RecordActions.SET_RECORD_CATEGORY]: setRecordCategory,
    [RecordActions.SET_SPLIT_RECORD_CATEGORY]: setSplitRecordCategory,
    [RecordActions.SET_SPLIT_RECORDS]: setSplitRecords,
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
 * Sets the category on a record's split record.
 *
 * @param draft     The draft state.
 * @param payload   The payload containing the account, record, split record and category for the split record.
 */
function setSplitRecordCategory(
  draft: Draft<IRecordStore>,
  payload: { accountId: string; recordId: string; splitRecordId: string; categoryId: string }
) {
  const { accountId, recordId, splitRecordId, categoryId } = payload;
  const record = draft.records[accountId].find(record => record.id === recordId);
  const splitRecord = record.splitRecords.find(sr => sr.id === splitRecordId);
  splitRecord.categoryId = categoryId;
}

/**
 * Sets the split records on a record.
 *
 * @param draft     The draft state.
 * @param payload   The payload containing the account, record and the split records for the record.
 */
function setSplitRecords(
  draft: Draft<IRecordStore>,
  payload: { accountId: string; recordId: string; splitRecords: ISplitRecord[] }
) {
  const { accountId, recordId, splitRecords } = payload;
  const record = draft.records[accountId].find(record => record.id === recordId);
  record.categoryId = undefined;
  record.splitRecords = splitRecords;
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
