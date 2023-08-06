import { Draft } from 'immer';
import { AccountActions } from '../account/account.actions';
import { IAccount } from '../account/account.interface';
import { AutoCategoryActions } from '../auto-category/auto-category.actions';
import { IAutoCategory } from '../auto-category/auto-category.interface';
import { createReducer } from '../create-reducer';
import { RecordActions } from './record.actions';
import { IRecord } from './record.interface';
import { IRecordStore } from './record.store.interface';
import { ISplitRecord } from './split-record.interface';

const initialState: IRecordStore = { records: {} };

export const RecordReducer = createReducer(
  {
    [RecordActions.SAVE_NEW_RECORDS]: saveNewRecords,
    [RecordActions.SET_DETAILS]: setDetails,
    [RecordActions.SET_RECORD_CATEGORY]: setRecordCategory,
    [RecordActions.SET_RECORD_AUTO_CATEGORY]: setRecordAutoCategory,
    [RecordActions.SET_SPLIT_RECORD_CATEGORY]: setSplitRecordCategory,
    [RecordActions.SET_SPLIT_RECORDS]: setSplitRecords,
    [RecordActions.DELETE_SPLIT_RECORDS]: deleteSplitRecords,
    [AccountActions.DELETE_ACCOUNT]: deleteRecords,
    [AutoCategoryActions.DELETE_AUTO_CATEGORY]: removeRecordAutoCategory,
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
  // TODO if the only record is a manual and it get's deleted... this doesn't remove the record.
  if (records && records.length > 0) {
    const accountId = records[0]?.accountId;
    draft.records[accountId] = records;
  }
}

/**
 * Sets the details on a record.
 *
 * @param draft     The draft state.
 * @param payload   The payload containing the account, record, and the details for the record.
 */
function setDetails(draft: Draft<IRecordStore>, payload: { accountId: string; recordId: string; details: string }) {
  const { accountId, recordId, details } = payload;
  const record = draft.records[accountId].find(record => record.id === recordId);
  record.details = details;
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
  const record = draft.records[accountId].find(record => record.id === recordId);
  record.categoryId = categoryId;
  record.autoCategoryId = undefined;
}

/**
 * Sets the category automatically for records based on the matching description.
 *
 * @param draft     The draft state.
 * @param payload   The action payload.
 */
function setRecordAutoCategory(
  draft: Draft<IRecordStore>,
  payload: {
    autoCategoryId: string;
    accountId: string;
    categoryId: string;
    description: string;
    overwriteExisting: boolean;
  }
) {
  const { autoCategoryId, accountId, categoryId, description, overwriteExisting } = payload;

  const recordsThatMatchDescription = draft.records[accountId].filter(
    r =>
      !r.splitRecords &&
      (!r.categoryId || (r.categoryId && r.autoCategoryId) || overwriteExisting) &&
      r.description.startsWith(description)
  );

  for (const matchedRecord of recordsThatMatchDescription) {
    matchedRecord.autoCategoryId = autoCategoryId;
    matchedRecord.categoryId = categoryId;
  }
}

/**
 * Removes the auto category id from records that use it.
 *
 * @param draft         The draft state.
 * @param autoCategory  The auto category that was removed.
 */
function removeRecordAutoCategory(draft: Draft<IRecordStore>, autoCategory: IAutoCategory) {
  const { accountId, id } = autoCategory;
  const records = draft.records[accountId];
  for (const record of records) {
    if (record.autoCategoryId === id) {
      record.autoCategoryId = undefined;
      record.categoryId = undefined;
    }
  }
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
 * Deletes the split records on a record.
 *
 * @param draft     The draft state.
 * @param payload   The payload containing the account and record to delete the split records from.
 */
function deleteSplitRecords(draft: Draft<IRecordStore>, payload: { accountId: string; recordId: string }) {
  const { accountId, recordId } = payload;
  const record = draft.records[accountId].find(record => record.id === recordId);
  delete record.splitRecords;
}

/**
 * Deletes records associated to an account.
 *
 * @param draft       The draft state.
 * @param accountId   The account id to delete records for.
 */
function deleteRecords(draft: Draft<IRecordStore>, account: IAccount) {
  delete draft.records[account.id];
}
