import { Dispatch } from 'redux';
import { sender } from '../ipc.send';
import { MergeRecordsFunc } from './merge-records.type';
import { IRecord } from './record.interface';
import { ISplitRecord } from './split-record.interface';

export class RecordActions {
  public static SAVE_NEW_RECORDS = 'SAVE_NEW_RECORDS';
  public static SET_RECORD_CATEGORY = 'SET_RECORD_CATEGORY';
  public static SET_SPLIT_RECORD_CATEGORY = 'SET_SPLIT_RECORD_CATEGORY';
  public static SET_SPLIT_RECORDS = 'SET_SPLIT_RECORDS';

  public static pendingRecordsMerged: MergeRecordsFunc = (
    dispatch: Dispatch,
    startingBalance: number,
    newRecords: IRecord[],
    existingRecords: IRecord[]
  ) => sender(dispatch, 'IPC_PENDING_RECORDS_MERGED', startingBalance, newRecords, existingRecords);

  public static saveNewRecords = (records: IRecord[]) => ({
    type: RecordActions.SAVE_NEW_RECORDS,
    payload: records,
  });

  public static setRecordCategory = (accountId: string, recordId: string, categoryId: string) => ({
    type: RecordActions.SET_RECORD_CATEGORY,
    payload: {
      accountId,
      recordId,
      categoryId,
    },
  });

  public static setSplitRecordCategory = (
    accountId: string,
    recordId: string,
    splitRecordId: string,
    categoryId: string
  ) => ({
    type: RecordActions.SET_SPLIT_RECORD_CATEGORY,
    payload: {
      accountId,
      recordId,
      splitRecordId,
      categoryId,
    },
  });

  public static setSplitRecords = (accountId: string, recordId: string, splitRecords: ISplitRecord[]) => ({
    type: RecordActions.SET_SPLIT_RECORDS,
    payload: {
      accountId,
      recordId,
      splitRecords,
    },
  });
}
