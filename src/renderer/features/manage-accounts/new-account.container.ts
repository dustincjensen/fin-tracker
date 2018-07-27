import { connect, Dispatch } from 'react-redux';
import { NewAccount } from './new-account.component';
import { INewAccountProps } from './new-account.component.interface';
import { SaveNewAccount } from '../../store/account/account.actions';

const mapDispatchToProps = (dispatch: Dispatch): INewAccountProps => {
  return {
    saveNewAccount: (account: any) => dispatch(SaveNewAccount(account))
  };
};

export const NewAccountContainer = connect(null, mapDispatchToProps)(NewAccount);
