import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountActions } from '../../store/account/account.actions';
import { IAccount } from '../../store/account/account.interface';
import { NewAccount } from './new-account.component';
import { INewAccountDispatchProps } from './new-account.props.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewAccountDispatchProps => ({
  saveNewAccount: (account: IAccount) => dispatch(AccountActions.saveNewAccount(account)),
});

export const NewAccountContainer = connect(null, mapDispatchToProps)(NewAccount);
