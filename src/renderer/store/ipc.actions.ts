import { IpcRendererEvent } from 'electron';
import * as pendingRecordsActions from './pending-records/pending-records.actions';
import * as recordsActions from './records/records.actions';

const lookup: { [type: string]: Function } = {
  ['IPC_NEW_RECORDS_PARSED']: pendingRecordsActions.ImportNewRecords,
  ['IPC_NEW_RECORDS_MERGED']: recordsActions.SaveNewRecords,
};

/**
 * Handles the incoming communication from the main process.
 * Looks up an action and triggers it based on the type from the background process.
 * 
 * @param _event    The renderer event.
 * @param ipcType   The type to lookup to trigger the necessary action.
 * @param args      The arguments to pass to the action.
 */
export function ipcHandler(_event: IpcRendererEvent, ipcType: string, ...args: unknown[]) {
  return lookup[ipcType](...args);
}
