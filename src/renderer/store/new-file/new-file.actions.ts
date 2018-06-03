import { sender } from '../ipc.send';
import { Dispatch } from 'redux';
import IStore from '../store.interface';

// IPC dispatch actions
export const NewScotiabankChequingFileSelected = (dispatch: Dispatch, filePath: string) => sender(dispatch, 'IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED', filePath);
export const NewScotiabankSavingsFileSelected = (dispatch: Dispatch, filePath: string) => sender(dispatch, 'IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED', filePath);
export const NewScotiabankVisaFileSelected = (dispatch: Dispatch, filePath: string) => sender(dispatch, 'IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED', filePath);

// State Selectors
export const NewScotiabankChequingStateSelector = (store: IStore) => store.newFile.chequingRecords;
export const NewScotiabankSavingsStateSelector = (store: IStore) => store.newFile.savingsRecords;
export const NewScotiabankVisaStateSelector = (store: IStore) => store.newFile.visaRecords;

// Action constants
export const NEW_SCOTIABANK_CHEQUING_FILE_PARSED = 'NEW_SCOTIABANK_CHEQUING_FILE_PARSED';
export const NEW_SCOTIABANK_SAVINGS_FILE_PARSED = 'NEW_SCOTIABANK_SAVINGS_FILE_PARSED';
export const NEW_SCOTIABANK_VISA_FILE_PARSED = 'NEW_SCOTIABANK_VISA_FILE_PARSED';

// Action creators
export function NewScotiabankChequingFileParsed(records) {
  return {
    type: NEW_SCOTIABANK_CHEQUING_FILE_PARSED,
    payload: records
  };
}

export function NewScotiabankSavingsFileParsed(records) {
  return {
    type: NEW_SCOTIABANK_SAVINGS_FILE_PARSED,
    payload: records
  };
}

export function NewScotiabankVisaFileParsed(records) {
  return {
    type: NEW_SCOTIABANK_VISA_FILE_PARSED,
    payload: records
  };
}
