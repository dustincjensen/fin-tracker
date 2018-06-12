import * as recordsActions from './records/records.actions';

const lookup: { [type: string]: Function } = {
  ['IPC_NEW_RECORDS_PARSED']: recordsActions.SaveNewRecords
};

export default function ipcHandler(event, ipcType, ...args: any[]) {
  return lookup[ipcType](...args);
}
