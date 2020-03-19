import { connect } from 'react-redux';
import { NewAccount } from './new-account.component';
import { INewAccountDispatchProps } from './new-account.props.interface';
import { SaveNewAccount } from '../../store/account/account.actions';
import { Dispatch } from 'redux';
import { IAccount } from '../../store/account/account.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewAccountDispatchProps => {
  return {
    saveNewAccount: (account: IAccount) => dispatch(SaveNewAccount(account)),
  };
};

export const NewAccountContainer = connect(null, mapDispatchToProps)(NewAccount);
