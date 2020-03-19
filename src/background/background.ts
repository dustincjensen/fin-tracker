import { ipcRenderer } from 'electron';
import { eventLookup } from './ipc/ipc.lookup';

ipcRenderer.on('IPC_SEND_BACKGROUND', (event, type, args: never[]) => {
  const value = eventLookup[type](...args);
  event.sender.send('IPC_RECEIVE_BACKGROUND', value.type, ...value.args);
});
