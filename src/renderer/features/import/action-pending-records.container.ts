import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountSelectors } from '../../store/account/account.selectors';
import { PendingRecordActions } from '../../store/pending-record/pending-record.actions';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';
import { RecordActions } from '../../store/record/record.actions';
import { IRecord } from '../../store/record/record.interface';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { ActionPendingRecords } from './action-pending-records.component';
import {
  IActionPendingRecordsStateProps,
  IActionPendingRecordsDispatchProps,
} from './action-pending-records.props.interface';

function mapStateToProps(state: IStore): IActionPendingRecordsStateProps {
  const { accountId, filePath, fileName, records } = PendingRecordSelectors.pendingRecords(state);
  const { name, accountType, startingBalance } = AccountSelectors.account(state, accountId);
  return {
    accountName: name,
    accountType: accountType,
    filePath,
    fileName,
    startingBalance,
    newRecords: records,
    existingRecords: RecordSelectors.recordsByAccountId(state, accountId),
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
