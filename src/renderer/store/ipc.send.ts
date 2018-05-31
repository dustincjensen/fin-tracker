import { send } from 'redux-electron-ipc';

export function sender(dispatch, type, ...args: any[]) {
  dispatch(send('IPC_RECEIVE_RENDERER', type, ...args));
}
