import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountActions } from '../../../store/account/account.actions';
import { IAccount } from '../../../store/account/account.interface';
import { EditAccount } from '../edit-account/edit-account.component';
import { IEditAccountProps } from '../edit-account/edit-account.props.interface';

type StateProps = Pick<IEditAccountProps, 'headerText' | 'saveButtonText' | 'canEditComplexFields'>;
type DispatchProps = Pick<IEditAccountProps, 'saveAccount'>;

const mapStateToProps = (): StateProps => ({
  headerText: 'New Account',
  saveButtonText: 'Save Account',
  canEditComplexFields: true,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveAccount: (account: IAccount) => dispatch(AccountActions.saveNewAccount(account)),
});

export const NewAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
