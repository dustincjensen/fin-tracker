import { Draft } from 'immer';
import { AccountActions } from '../account/account.actions';
import { IAccount } from '../account/account.interface';
import { createReducer } from '../create-reducer';
import { InvestmentRecordActions } from './investment-record.actions';
import { IInvestmentRecord } from './investment-record.interface';
import { IInvestmentRecordStore } from './investment-record.store.interface';

const initialState: IInvestmentRecordStore = { records: {} };

export const InvestmentRecordReducer = createReducer(
  {
    [InvestmentRecordActions.ADD_RECORD]: addRecord,
    [InvestmentRecordActions.DELETE_RECORD]: deleteRecord,
    [AccountActions.DELETE_ACCOUNT]: deleteRecords,
  },
  initialState
);

function addRecord(draft: Draft<IInvestmentRecordStore>, record: IInvestmentRecord) {
  const { accountId } = record;
  if (!draft.records[accountId]) {
    draft.records[accountId] = [];
  }
  draft.records[accountId].push(record);
}

function deleteRecord(draft: Draft<IInvestmentRecordStore>, record: IInvestmentRecord) {
  const { accountId } = record;
  draft.records[accountId] = draft.records[accountId].filter(r => r.id !== record.id);
}

/**
 * Deletes records associated to an account.
 *
 * @param draft       The draft state.
 * @param accountId   The account id to delete records for.
 */
function deleteRecords(draft: Draft<IInvestmentRecordStore>, account: IAccount) {
  delete draft.records[account.id];
}
