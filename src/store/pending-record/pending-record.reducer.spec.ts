import { build } from '../../utils/test.utils';
import { IRecord } from '../record/record.interface';
import { PendingRecordActions } from './pending-record.actions';
import { PendingRecordReducer as reducer } from './pending-record.reducer';
import { IPendingRecordStore } from './pending-record.store.interface';

describe('reducers', () => {
    describe('Pending Records', () => {
        const defaultState: IPendingRecordStore = {
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

        describe('importRecords', () => {
            it('should set imported records when records exist', () => {
                const initialState: IPendingRecordStore = build<IPendingRecordStore>({ ...defaultState });

                const newState = reducer(initialState, {
                    type: PendingRecordActions.NEW_RECORDS_IMPORTED,
                    payload: {
                        records: [record],
                        accountId,
                        filePath: '/path/to/file',
                        fileName: 'file',
                    },
                });

                const expectedState = build<IPendingRecordStore>({
                    records: [record],
                    accountId,
                    filePath: '/path/to/file',
                    fileName: 'file',
                });
                expect(newState).toEqual(expectedState);
            });

            it('should clear imported records when records do not exist', () => {
                const initialState = build<IPendingRecordStore>({
                    records: [record],
                    accountId,
                    filePath: '/path/to/file',
                    fileName: 'file',
                });

                const newState = reducer(initialState, {
                    type: PendingRecordActions.NEW_RECORDS_IMPORTED,
                    payload: {
                        records: [],
                        accountId,
                        filePath: '/path/to/file',
                        fileName: 'file',
                    },
                });

                const expectedState: IPendingRecordStore = {
                    ...defaultState,
                    fileName: 'file',
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('importError', () => {
            it('should set the error state', () => {
                const initialState: IPendingRecordStore = build<IPendingRecordStore>({});

                const newState = reducer(initialState, {
                    type: PendingRecordActions.NEW_RECORDS_ERROR,
                    payload: {
                        filePath: '/path/to/file',
                        fileName: 'file',
                        error: 'Error',
                    },
                });

                const expectedState = build<IPendingRecordStore>({
                    filePath: '/path/to/file',
                    fileName: 'file',
                    error: 'Error',
                });
                expect(newState).toEqual(expectedState);
            });
        });

        describe('clearError', () => {
            it('should clear the error', () => {
                const initialState = build<IPendingRecordStore>({
                    error: 'Error',
                });

                const newState = reducer(initialState, {
                    type: PendingRecordActions.CLEAR_RECORDS_ERROR,
                });

                const expectedState = build<IPendingRecordStore>({
                    error: undefined,
                });
                expect(newState).toEqual(expectedState);
            });
        });

        describe('clearRecords', () => {
            it('should clear all state', () => {
                const initialState: IPendingRecordStore = {
                    accountId,
                    fileName: 'file',
                    filePath: '/path/to/file',
                    records: [record],
                    error: 'Error',
                };

                const newState = reducer(initialState, {
                    type: PendingRecordActions.CLEAR_RECORDS_IMPORTED,
                });

                const expectedState = defaultState;
                expect(newState).toEqual(expectedState);
            });
        });

        describe('updatePendingRecordCategory', () => {
            it('should update category id of existing record', () => {
                const initialState = build<IPendingRecordStore>({
                    records: [record],
                });

                const newState = reducer(initialState, {
                    type: PendingRecordActions.UPDATE_PENDING_RECORD_CATEGORY,
                    payload: {
                        recordId: record.id,
                        categoryId: 'categoryId',
                    },
                });

                const expectedState = build<IPendingRecordStore>({
                    records: [
                        {
                            ...record,
                            categoryId: 'categoryId',
                        },
                    ],
                });
                expect(newState).toEqual(expectedState);
            });
        });
    });
});
