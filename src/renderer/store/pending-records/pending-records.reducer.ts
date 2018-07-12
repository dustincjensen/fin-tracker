import { PendingRecords } from './pending-records.interface';
import * as recordsActions from '../records/records.actions';
import * as pendingRecordsActions from './pending-records.actions';

const initialState: PendingRecords = {
    accountId: undefined,
    records: []
};

export function PendingRecordsReducer(state = initialState, action): PendingRecords {
    switch (action.type) {
        case pendingRecordsActions.NEW_RECORDS_UPLOADED:
            // Get the records and check if there were any returned.
            const records = action.payload;
            if (!records || records.length === 0) {
                return { accountId: undefined, records: [] };
            }
            const { accountId } = records[0]
            return { accountId, records: [...records] };
        case pendingRecordsActions.CLEAR_RECORDS_UPLOADED:
            return { accountId: undefined, records: [] };
        case recordsActions.SAVE_NEW_RECORDS:
            return { accountId: undefined, records: [] };
    }
    return state;
}