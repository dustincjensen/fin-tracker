import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { RecordActions } from '../record/record.actions';
import { IRecord } from '../record/record.interface';
import { PendingRecordActions } from './pending-record.actions';
import { IPendingRecordStore } from './pending-record.store.interface';

const initialState: IPendingRecordStore = {
  accountId: undefined,
  filePath: undefined,
  fileName: undefined,
  records: [],
  error: undefined,
};

export const PendingRecordReducer = createDraftReducer(
  {
    [PendingRecordActions.NEW_RECORDS_IMPORTED]: importRecords,
    [PendingRecordActions.NEW_RECORDS_ERROR]: importError,
    [PendingRecordActions.CLEAR_RECORDS_ERROR]: clearError,
    [PendingRecordActions.CLEAR_RECORDS_IMPORTED]: clearRecords,
    [RecordActions.SAVE_NEW_RECORDS]: clearRecords,
    // TODO delete account.
  },
  initialState
);

/**
 * Saves the records to state so they may be reviewed.
 *
 * @param draft     The draft state.
 * @param records   The records to review for importing.
 */
function importRecords(
  draft: Draft<IPendingRecordStore>,
  payload: {
    records: IRecord[];
    accountId: string;
    filePath: string;
    fileName: string;
  }
) {
  const { records, accountId, filePath, fileName } = payload;

  draft.error = undefined;

  if (records && records.length > 0) {
    draft.accountId = accountId;
    draft.filePath = filePath;
    draft.fileName = fileName;
    draft.records = records;
  } else {
    draft.accountId = undefined;
    draft.filePath = undefined;
    draft.records = [];
  }
}

/**
 * Import error occurred.
 * 
 * @param draft     The draft state.
 * @param payload   The details of the file that failed parsing.
 */
function importError(draft: Draft<IPendingRecordStore>, payload: { error: string; filePath: string; fileName: string }) {
  const { error, fileName, filePath } = payload;
  draft.error = error;
  draft.fileName = fileName;
  draft.filePath = filePath;
}

/**
 * Clears the import error.
 * 
 * @param draft     The draft state.
 */
function clearError(draft: Draft<IPendingRecordStore>) {
  draft.error = undefined;
}

/**
 * Clears the records and account id from state.
 *
 * @param draft     The draft state.
 */
function clearRecords(draft: Draft<IPendingRecordStore>) {
  draft.accountId = undefined;
  draft.filePath = undefined;
  draft.fileName = undefined;
  draft.records = [];
  draft.error = undefined;
}
