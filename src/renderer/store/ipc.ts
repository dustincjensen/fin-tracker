import createIpc from 'redux-electron-ipc';
import { ipcHandler } from './ipc.actions';

/**
 * Registered with the redux store middleware.
 * This will forward events from the inter-process communication to the
 * ipcHandler which will return an action for the redux store to handle.
 */
export const ipcReceive = createIpc({
  IPC_SEND_RENDERER: ipcHandler,
});
