import { build } from '../../utils/test.utils';
import { RecordActions } from '../record/record.actions';
import { IRecord } from '../record/record.interface';
import {
    PendingRecordStore,
    pendingRecordReducer,
    clearError,
    clearImportedRecords,
    importError,
    importNewRecords,
    updatePendingRecordCategory,
} from './pending-record-slice';

describe('Pending Record slice', () => {
    const defaultState: PendingRecordStore = {
        accountId: undefined,
        error: undefined,
        fileName: undefined,
        filePath: undefined,
        records: [],
    };
    const accountId = 'accountId';
    const recordId = 'recordId';
    const record: IRecord = {
        accountId: accountId,
        date: '2020-12-31',
        description: 'description',
        id: recordId,
        debit: 12.34,
    };

    describe('importNewRecords', () => {
        it('should set imported records when records exist', () => {
            const newState = pendingRecordReducer(
                build<PendingRecordStore>({ ...defaultState }),
                importNewRecords({
                    records: [record],
                    accountId,
                    filePath: '/path/to/file',
                    fileName: 'file',
                })
            );

            expect(newState).toEqual(
                build<PendingRecordStore>({
                    records: [record],
                    accountId,
                    filePath: '/path/to/file',
                    fileName: 'file',
                })
            );
        });

        it('should clear imported records when records do not exist', () => {
            const newState = pendingRecordReducer(
                build<PendingRecordStore>({
                    records: [record],
                    accountId,
                    filePath: '/path/to/file',
                    fileName: 'file',
                }),
                importNewRecords({
                    records: [],
                    accountId,
                    filePath: '/path/to/file',
                    fileName: 'file',
                })
            );

            expect(newState).toEqual({
                ...defaultState,
                fileName: 'file',
            });
        });
    });

    describe('importError', () => {
        it('should set the error state', () => {
            const newState = pendingRecordReducer(
                build<PendingRecordStore>({}),
                importError({
                    filePath: '/path/to/file',
                    fileName: 'file',
                    error: 'Error',
                })
            );

            expect(newState).toEqual(
                build<PendingRecordStore>({
                    filePath: '/path/to/file',
                    fileName: 'file',
                    error: 'Error',
                })
            );
        });
    });

    describe('clearError', () => {
        it('should clear the error', () => {
            const newState = pendingRecordReducer(
                build<PendingRecordStore>({
                    error: 'Error',
                }),
                clearError()
            );

            expect(newState).toEqual(
                build<PendingRecordStore>({
                    error: undefined,
                })
            );
        });
    });

    describe('clearImportedRecords', () => {
        it('should clear all state', () => {
            const newState = pendingRecordReducer(
                {
                    accountId,
                    fileName: 'file',
                    filePath: '/path/to/file',
                    records: [record],
                    error: 'Error',
                },
                clearImportedRecords()
            );

            expect(newState).toEqual(defaultState);
        });
    });

    describe('updatePendingRecordCategory', () => {
        it('should update category id of existing record', () => {
            const newState = pendingRecordReducer(
                build<PendingRecordStore>({
                    records: [record],
                }),
                updatePendingRecordCategory({
                    recordId: record.id,
                    categoryId: 'categoryId',
                })
            );

            expect(newState).toEqual(
                build<PendingRecordStore>({
                    records: [
                        {
                            ...record,
                            categoryId: 'categoryId',
                        },
                    ],
                })
            );
        });
    });

    describe('extraReducers', () => {
        describe('saveNewRecords', () => {
            it('should clear all state', () => {
                const newState = pendingRecordReducer(
                    {
                        accountId,
                        fileName: 'file',
                        filePath: '/path/to/file',
                        records: [record],
                        error: 'Error',
                    },
                    {
                        type: RecordActions.SAVE_NEW_RECORDS,
                    }
                );

                expect(newState).toEqual(defaultState);
            });
        });
    });
});
