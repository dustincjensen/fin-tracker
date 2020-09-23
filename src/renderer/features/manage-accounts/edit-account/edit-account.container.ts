import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountActions } from '../../../store/account/account.actions';
import { IAccount } from '../../../store/account/account.interface';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { EditAccount } from './edit-account.component';
import { IEditAccountProps } from './edit-account.props.interface';

const mapStateToProps = (
  state: IStore,
  ownProps: Pick<IEditAccountProps, 'account'>
): Pick<IEditAccountProps, 'saveButtonText' | 'canEditComplexFields'> => {
  const records = RecordSelectors.recordsByAccountId(state, ownProps.account.id);
  return {
    saveButtonText: 'Update Account',
    canEditComplexFields: !records || records.length === 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<IEditAccountProps, 'saveAccount'> => ({
  saveAccount: (account: IAccount) => dispatch(AccountActions.updateAccount(account)),
});

export const EditAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
