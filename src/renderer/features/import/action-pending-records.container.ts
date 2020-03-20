import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PendingRecordActions } from '../../store/pending-record/pending-record.actions';
import { RecordActions } from '../../store/record/record.actions';
import { IRecord } from '../../store/record/record.interface';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import {
  ActionPendingRecords,
  IActionPendingRecordsDispatchProps,
  IActionPendingRecordsStateProps,
} from './action-pending-records.component';

function mapStateToProps(state: IStore): IActionPendingRecordsStateProps {
  const { accountId, records } = state.pendingRecords;
  const account = state.accounts.accounts[accountId];
  return {
    startingBalance: account.startingBalance,
    newRecords: records,
    existingRecords: RecordSelectors.records(state, accountId),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IActionPendingRecordsDispatchProps {
  return {
    accept: (startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) =>
      RecordActions.pendingRecordsMerged(dispatch, startingBalance, newRecords, existingRecords),
    clear: () => dispatch(PendingRecordActions.clearImportedRecords()),
  };
}

export const ActionPendingRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(ActionPendingRecords);
