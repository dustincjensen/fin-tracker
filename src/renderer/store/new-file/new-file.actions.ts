import { sender } from '../ipc.send';

// IPC dispatch actions
export const NewFileSelected = (dispatch, filePath) => sender(dispatch, 'IPC_NEW_FILE_SELECTED', filePath);

// Action constants
export const NEW_FILE_PARSED = 'NEW_FILE_PARSED';

// Action creators
export function NewFileParsed(records) {
  return {
    type: NEW_FILE_PARSED,
    payload: records
  };
}
