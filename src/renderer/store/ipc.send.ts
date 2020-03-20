import { Dispatch } from 'redux';
import { send } from 'redux-electron-ipc';

/**
 * Used by actions to send events to the background process for intensive calculations.
 *
 * @param dispatch  The redux dispatch.
 * @param type      The type of event that should be triggered in the background process.
 * @param args      The arguments to pass to the background process.
 */
export function sender(dispatch: Dispatch, type: string, ...args: unknown[]) {
  dispatch(send('IPC_RECEIVE_RENDERER', type, ...args));
}
