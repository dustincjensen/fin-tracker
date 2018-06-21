import { Dispatch } from 'redux';
import { sender } from '../ipc.send';
import { IRecord } from './record.interface';
import { ImportRecordsFunc } from './import-records.type';

// IPC dispatch actions
export const NewScotiabankChequingFileSelected: ImportRecordsFunc = (
  dispatch: Dispatch,
  accountId: string,
  filePath: string,
  startingBalance: number,
  records: IRecord[]
) => sender(dispatch, 'IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED', accountId, filePath, startingBalance, records);

export const NewScotiabankSavingsFileSelected: ImportRecordsFunc = (
  dispatch: Dispatch,
  accountId: string,
  filePath: string,
  startingBalance: number,
  records: IRecord[]
) => sender(dispatch, 'IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED', accountId, filePath, startingBalance, records);

export const NewScotiabankVisaFileSelected: ImportRecordsFunc = (
  dispatch: Dispatch,
  accountId: string,
  filePath: string,
  startingBalance: number,
  records: IRecord[]
) => sender(dispatch, 'IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED', accountId, filePath, startingBalance, records);

// Action constants
export const SAVE_NEW_RECORDS = 'SAVE_NEW_RECORDS';

// Action Creators
export function SaveNewRecords(records: IRecord[]) {
  return {
    type: SAVE_NEW_RECORDS,
    payload: records
  };
}
