import { send } from 'redux-electron-ipc';

export function NewFileSelected(dispatch, filePath) {
  // TODO abstract away the redux-electron-ipc send so we don't have to 
  // manually specify IPC_RECEIVE_RENDERER on each dispatch.
  dispatch(send('IPC_RECEIVE_RENDERER', 'IPC_NEW_FILE_SELECTED', filePath));
}

export const NEW_FILE_PARSED = 'NEW_FILE_PARSED';

export function NewFileParsed(records) {
  return {
    type: NEW_FILE_PARSED,
    payload: records
  };
}
