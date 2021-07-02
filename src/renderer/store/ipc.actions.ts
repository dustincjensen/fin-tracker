import { IpcRendererEvent } from 'electron';
import { PendingRecordActions } from './pending-record/pending-record.actions';
import { RecordActions } from './record/record.actions';

// eslint-disable-next-line @typescript-eslint/ban-types
const lookup: { [type: string]: Function } = {
  ['IPC_NEW_RECORDS_PARSED']: PendingRecordActions.importNewRecords,
  ['IPC_NEW_RECORDS_ERROR']: PendingRecordActions.importError,
  ['IPC_NEW_RECORDS_MERGED']: RecordActions.saveNewRecords,
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
