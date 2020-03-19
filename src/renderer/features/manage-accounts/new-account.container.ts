import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SaveNewAccount } from '../../store/account/account.actions';
import { IAccount } from '../../store/account/account.interface';
import { NewAccount } from './new-account.component';
import { INewAccountDispatchProps } from './new-account.props.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewAccountDispatchProps => {
  return {
    saveNewAccount: (account: IAccount) => dispatch(SaveNewAccount(account)),
  };
};

export const NewAccountContainer = connect(null, mapDispatchToProps)(NewAccount);
