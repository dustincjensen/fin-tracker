import { IRecord } from '../record/record.interface';

export class PendingRecordActions {
  public static NEW_RECORDS_IMPORTED = 'NEW_RECORDS_IMPORTED';
  public static NEW_RECORDS_ERROR = 'NEW_RECORDS_ERROR';
  public static CLEAR_RECORDS_ERROR = 'CLEAR_RECORDS_ERROR';
  public static CLEAR_RECORDS_IMPORTED = 'CLEAR_RECORDS_IMPORTED';
  public static DELETE_PENDING_RECORD = 'DELETE_PENDING_RECORD';
  public static UPDATE_PENDING_RECORD_CATEGORY = 'UPDATE_PENDING_RECORD_CATEGORY';

  public static importNewRecords = (records: IRecord[], accountId: string, filePath: string, fileName: string) => ({
    type: PendingRecordActions.NEW_RECORDS_IMPORTED,
    payload: {
      records,
      accountId,
      filePath,
      fileName,
    },
  });

  public static importError = (error: string, filePath: string, fileName: string) => ({
    type: PendingRecordActions.NEW_RECORDS_ERROR,
    payload: {
      error,
      filePath,
      fileName,
    },
  });

  public static clearError = () => ({
    type: PendingRecordActions.CLEAR_RECORDS_ERROR,
  });

  public static clearImportedRecords = () => ({
    type: PendingRecordActions.CLEAR_RECORDS_IMPORTED,
    payload: null,
  });

  public static deletePendingRecord = (recordId: string) => ({
    type: PendingRecordActions.DELETE_PENDING_RECORD,
    payload: recordId,
  });

  public static updatePendingRecordCategory = (recordId: string, categoryId: string) => ({
    type: PendingRecordActions.UPDATE_PENDING_RECORD_CATEGORY,
    payload: {
      recordId,
      categoryId,
    },
  });
}
