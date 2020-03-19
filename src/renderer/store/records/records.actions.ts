import { Dispatch } from 'redux';
import { sender } from '../ipc.send';
import { MergeRecordsFunc } from './merge-records.type';
import { IRecord } from './record.interface';

// IPC Actions
export const PendingRecordsMerged: MergeRecordsFunc = (
  dispatch: Dispatch,
  startingBalance: number,
  newRecords: IRecord[],
  existingRecords: IRecord[]
) => sender(dispatch, 'IPC_PENDING_RECORDS_MERGED', startingBalance, newRecords, existingRecords);

// Action constants
export const SAVE_NEW_RECORDS = 'SAVE_NEW_RECORDS';

// Action Creators
export function SaveNewRecords(records: IRecord[]) {
  return {
    type: SAVE_NEW_RECORDS,
    payload: records,
  };
}
