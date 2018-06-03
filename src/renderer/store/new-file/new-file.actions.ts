import { sender } from '../ipc.send';
import { Dispatch } from 'redux';

// IPC dispatch actions
export const NewScotiabankChequingFileSelected = (dispatch: Dispatch, filePath: string) => sender(dispatch, 'IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED', filePath);
export const NewScotiabankSavingsFileSelected = (dispatch: Dispatch, filePath: string) => sender(dispatch, 'IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED', filePath);
export const NewScotiabankVisaFileSelected = (dispatch: Dispatch, filePath: string) => sender(dispatch, 'IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED', filePath);

// Action constants
export const NEW_FILE_PARSED = 'NEW_FILE_PARSED';

// Action creators
export function NewFileParsed(records) {
  return {
    type: NEW_FILE_PARSED,
    payload: records
  };
}
