import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { AccountActions } from '../../../store/account/account.actions';
import { IAccount } from '../../../store/account/account.interface';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { createDate } from '../../../utils/date.utils';
import { EditAccount } from './edit-account.component';
import { IEditAccountProps } from './edit-account.props.interface';

type StateProps = Pick<
  IEditAccountProps,
  'saveButtonText' | 'canEditComplexFields' | 'currentBalance' | 'lastTransactionDate'
>;
type DispatchProps = Pick<IEditAccountProps, 'saveAccount' | 'archiveAccount'>;
type OwnProps = Pick<IEditAccountProps, 'account'>;

const mapStateToProps = () => {
  const selectLastTransactionDate = createSelector(RecordSelectors.recordsByAccountId, (records): [number, number] => {
    const lastRecordDate = records?.[records.length - 1]?.date;
    if (lastRecordDate) {
      const lrd = createDate(lastRecordDate);
      return [lrd.year(), lrd.month()];
    }
    return undefined;
  });

  return (state: IStore, ownProps: OwnProps): StateProps => {
    const records = RecordSelectors.recordsByAccountId(state, ownProps.account.id);
    const currentBalance = RecordSelectors.currentBalance(state, ownProps.account.id);
    const lastTransactionDate = selectLastTransactionDate(state, ownProps.account.id);
    return {
      saveButtonText: 'Update Account',
      canEditComplexFields: (!records || records.length === 0) && !ownProps.account.archived,
      currentBalance,
      lastTransactionDate,
    };
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveAccount: (account: IAccount) => dispatch(AccountActions.updateAccount(account)),
  archiveAccount: (id: string, archived: boolean, endYear: number, endMonth: number) =>
    dispatch(AccountActions.archiveAccount(id, archived, endYear, endMonth)),
});

export const EditAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
