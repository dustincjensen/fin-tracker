import { Dispatch } from 'redux';
import { sender } from '../ipc.send';
import { MergeRecordsFunc } from './merge-records.type';
import { IRecord } from './record.interface';

export class RecordActions {
  public static SAVE_NEW_RECORDS = 'SAVE_NEW_RECORDS';

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
}
