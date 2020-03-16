import { PendingRecords } from './pending-records.interface';
import * as recordsActions from '../records/records.actions';
import * as pendingRecordsActions from './pending-records.actions';
import produce from 'immer';

const initialState: PendingRecords = {
    accountId: undefined,
    records: []
};

export const PendingRecordsReducer = produce((state: PendingRecords, action) => {
    switch (action.type) {
        case pendingRecordsActions.NEW_RECORDS_IMPORTED:
            // Get the records and check if there were any returned.
            const records = action.payload;
            if (!records || records.length === 0) {
                state.accountId = undefined;
                state.records = [];
                break;
            }
            const { accountId } = records[0];
            state.accountId = accountId;
            state.records = records;
            break;
        case pendingRecordsActions.CLEAR_RECORDS_IMPORTED:
        case recordsActions.SAVE_NEW_RECORDS:
            state.accountId = undefined;
            state.records = [];
            break;
    }
}, initialState);