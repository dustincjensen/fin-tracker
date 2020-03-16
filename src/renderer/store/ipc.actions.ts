import * as pendingRecordsActions from './pending-records/pending-records.actions';
import * as recordsActions from './records/records.actions';

const lookup: { [type: string]: Function } = {
  ['IPC_NEW_RECORDS_PARSED']: pendingRecordsActions.ImportNewRecords,
  ['IPC_NEW_RECORDS_MERGED']: recordsActions.SaveNewRecords
};

export function ipcHandler(event, ipcType, ...args: any[]) {
  return lookup[ipcType](...args);
}
