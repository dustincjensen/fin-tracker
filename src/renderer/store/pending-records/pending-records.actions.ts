import { Dispatch } from 'redux';
import { sender } from '../ipc.send';
import { ImportRecordsFunc } from './import-records.type';
import { IRecord } from '../records/record.interface';

// IPC dispatch actions
export const NewScotiabankChequingFileSelected: ImportRecordsFunc = (
    dispatch: Dispatch,
    accountId: string,
    filePath: string
) => sender(dispatch, 'IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED', accountId, filePath);

export const NewScotiabankSavingsFileSelected: ImportRecordsFunc = (
    dispatch: Dispatch,
    accountId: string,
    filePath: string
) => sender(dispatch, 'IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED', accountId, filePath);

export const NewScotiabankVisaFileSelected: ImportRecordsFunc = (
    dispatch: Dispatch,
    accountId: string,
    filePath: string
) => sender(dispatch, 'IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED', accountId, filePath);

// Action constants
export const NEW_RECORDS_IMPORTED = 'NEW_RECORDS_IMPORTED';
export const CLEAR_RECORDS_IMPORTED = 'CLEAR_RECORDS_IMPORTED';

// Action Creators
export function ImportNewRecords(records: IRecord[]) {
    return {
        type: NEW_RECORDS_IMPORTED,
        payload: records
    };
}

export function ClearImportedRecords() {
    return {
        type: CLEAR_RECORDS_IMPORTED,
        payload: null
    };
}