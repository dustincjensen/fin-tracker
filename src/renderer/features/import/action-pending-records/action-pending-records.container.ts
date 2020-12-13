import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { PendingRecordActions } from '../../../store/pending-record/pending-record.actions';
import { PendingRecordSelectors } from '../../../store/pending-record/pending-record.selectors';
import { RecordActions } from '../../../store/record/record.actions';
import { IRecord } from '../../../store/record/record.interface';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { ActionPendingRecords } from './action-pending-records.component';
import { IActionPendingRecordsProps } from './action-pending-records.props.interface';

type StateProps = Omit<IActionPendingRecordsProps, 'accept' | 'clear'>;
type DispatchProps = Pick<IActionPendingRecordsProps, 'accept' | 'clear'>;

const mapStateToProps = (state: IStore): StateProps => {
  const pendingRecords = PendingRecordSelectors.pendingRecords(state);
  const account = AccountSelectors.account(state, pendingRecords?.accountId);
  return {
    accountName: account?.name,
    accountType: account?.accountType,
    filePath: pendingRecords?.filePath,
    fileName: pendingRecords?.fileName,
    startingBalance: account?.startingBalance,
    newRecords: pendingRecords?.records,
    existingRecords: RecordSelectors.recordsByAccountId(state, pendingRecords?.accountId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    accept: (startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) =>
      RecordActions.newRecordsMerged(dispatch, startingBalance, newRecords, existingRecords),
    clear: () => dispatch(PendingRecordActions.clearImportedRecords()),
  };
};

export const ActionPendingRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(ActionPendingRecords);
