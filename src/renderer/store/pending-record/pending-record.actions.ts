import { Dispatch } from 'redux';
import { sender } from '../ipc.send';
import { IRecord } from '../record/record.interface';
import { ImportRecordsFunc } from './import-records.type';

export class PendingRecordActions {
  public static NEW_RECORDS_IMPORTED = 'NEW_RECORDS_IMPORTED';
  public static CLEAR_RECORDS_IMPORTED = 'CLEAR_RECORDS_IMPORTED';

  public static newScotiabankChequingFileSelected: ImportRecordsFunc = (
    dispatch: Dispatch,
    accountId: string,
    filePath: string
  ) => sender(dispatch, 'IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED', accountId, filePath);

  public static newScotiabankSavingsFileSelected: ImportRecordsFunc = (
    dispatch: Dispatch,
    accountId: string,
    filePath: string
  ) => sender(dispatch, 'IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED', accountId, filePath);

  public static newScotiabankVisaFileSelected: ImportRecordsFunc = (
    dispatch: Dispatch,
    accountId: string,
    filePath: string
  ) => sender(dispatch, 'IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED', accountId, filePath);

  public static importNewRecords = (records: IRecord[]) => ({
    type: PendingRecordActions.NEW_RECORDS_IMPORTED,
    payload: records,
  });

  public static clearImportedRecords = () => ({
    type: PendingRecordActions.CLEAR_RECORDS_IMPORTED,
    payload: null,
  });
}
