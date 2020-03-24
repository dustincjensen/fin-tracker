import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountActions } from '../../store/account/account.actions';
import { IAccount } from '../../store/account/account.interface';
import { EditAccount } from './edit-account.component';
import { IEditAccountDispatchProps, IEditAccountStateProps } from './edit-account.props.interface';

const mapStateToProps = (): IEditAccountStateProps => ({
  headerText: 'New Account',
  saveButtonText: 'Save Account',
  canEditComplexFields: true,
});

const mapDispatchToProps = (dispatch: Dispatch): IEditAccountDispatchProps => ({
  saveAccount: (account: IAccount) => dispatch(AccountActions.saveNewAccount(account)),
});

export const NewAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
