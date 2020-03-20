import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { RecordActions } from '../record/record.actions';
import { IRecord } from '../record/record.interface';
import { PendingRecordActions } from './pending-record.actions';
import { IPendingRecordStore } from './pending-record.store.interface';

const initialState: IPendingRecordStore = {
  accountId: undefined,
  records: [],
};

export const PendingRecordReducer = createDraftReducer(
  {
    [PendingRecordActions.NEW_RECORDS_IMPORTED]: importRecords,
    [PendingRecordActions.CLEAR_RECORDS_IMPORTED]: clearRecords,
    [RecordActions.SAVE_NEW_RECORDS]: clearRecords,
  },
  initialState
);

/**
 * Saves the records to state so they may be reviewed.
 *
 * @param draft     The draft state.
 * @param records   The records to review for importing.
 */
function importRecords(draft: Draft<IPendingRecordStore>, records: IRecord[]) {
  if (records && records.length > 0) {
    const { accountId } = records[0];
    draft.accountId = accountId;
    draft.records = records;
  } else {
    draft.accountId = undefined;
    draft.records = [];
  }
}

/**
 * Clears the records and account id from state.
 *
 * @param draft       The draft state.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function clearRecords(draft: Draft<IPendingRecordStore>) {
  draft.accountId = undefined;
  draft.records = [];
}
