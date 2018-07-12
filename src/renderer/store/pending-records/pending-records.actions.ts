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
export const NEW_RECORDS_UPLOADED = 'NEW_RECORDS_UPLOADED';
export const CLEAR_RECORDS_UPLOADED = 'CLEAR_RECORDS_UPLOADED';

// Action Creators
export function UploadNewRecords(records: IRecord[]) {
    return {
        type: NEW_RECORDS_UPLOADED,
        payload: records
    };
}

export function ClearUploadedRecords() {
    return {
        type: CLEAR_RECORDS_UPLOADED,
        payload: null
    };
}