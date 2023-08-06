import { IRecord } from './record.interface';
import { ISplitRecord } from './split-record.interface';

export class RecordActions {
    public static SAVE_NEW_RECORDS = 'SAVE_NEW_RECORDS';
    public static SET_DETAILS = 'SET_DETAILS';
    public static SET_RECORD_CATEGORY = 'SET_RECORD_CATEGORY';
    public static SET_RECORD_AUTO_CATEGORY = 'SET_RECORD_AUTO_CATEGORY';
    public static SET_SPLIT_RECORD_CATEGORY = 'SET_SPLIT_RECORD_CATEGORY';
    public static SET_SPLIT_RECORDS = 'SET_SPLIT_RECORDS';
    public static DELETE_SPLIT_RECORDS = 'DELETE_SPLIT_RECORDS';

    public static saveNewRecords = (records: IRecord[]) => ({
        type: RecordActions.SAVE_NEW_RECORDS,
        payload: records,
    });

    public static setDetails = (accountId: string, recordId: string, details: string) => ({
        type: RecordActions.SET_DETAILS,
        payload: {
            accountId,
            recordId,
            details,
        },
    });

    public static setRecordCategory = (accountId: string, recordId: string, categoryId: string) => ({
        type: RecordActions.SET_RECORD_CATEGORY,
        payload: {
            accountId,
            recordId,
            categoryId,
        },
    });

    public static setRecordsAutoCategory = (
        accountId: string,
        autoCategoryId: string,
        categoryId: string,
        description: string,
        overwriteExisting: boolean
    ) => ({
        type: RecordActions.SET_RECORD_AUTO_CATEGORY,
        payload: {
            accountId,
            autoCategoryId,
            categoryId,
            description,
            overwriteExisting,
        },
    });

    public static setSplitRecordCategory = (
        accountId: string,
        recordId: string,
        splitRecordId: string,
        categoryId: string
    ) => ({
        type: RecordActions.SET_SPLIT_RECORD_CATEGORY,
        payload: {
            accountId,
            recordId,
            splitRecordId,
            categoryId,
        },
    });

    public static setSplitRecords = (accountId: string, recordId: string, splitRecords: ISplitRecord[]) => ({
        type: RecordActions.SET_SPLIT_RECORDS,
        payload: {
            accountId,
            recordId,
            splitRecords,
        },
    });

    public static deleteSplitRecords = (accountId: string, recordId: string) => ({
        type: RecordActions.DELETE_SPLIT_RECORDS,
        payload: {
            accountId,
            recordId,
        },
    });
}
