import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import NewAccount from '../components/new-account/new-account.component';
import { INewAccountProps } from '../components/new-account/new-account.props';
import { SaveNewAccount } from '../store/account/account.actions';

interface INewAccountContainerProps {
  navigate: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewAccountContainerProps): INewAccountProps => {
  return {
    saveNewAccount: (account: any) => dispatch(SaveNewAccount(account)),
    afterSave: () => ownProps.navigate()
  };
};

export default connect(null, mapDispatchToProps)(NewAccount);
