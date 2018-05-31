import createIpc from 'redux-electron-ipc';
import ipcHandler from './ipc.actions';

export const ipcReceive = createIpc({
  'IPC_SEND_RENDERER': ipcHandler
});

export default ipcReceive;
