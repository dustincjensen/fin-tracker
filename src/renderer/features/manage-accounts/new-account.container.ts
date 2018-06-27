import { connect, Dispatch } from 'react-redux';
import { NewAccount } from './new-account.component';
import { INewAccountProps } from './new-account.component.interface';
import { SaveNewAccount } from '../../store/account/account.actions';

interface INewAccountContainerProps {
  navigate: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewAccountContainerProps): INewAccountProps => {
  return {
    saveNewAccount: (account: any) => dispatch(SaveNewAccount(account)),
    afterSave: () => ownProps.navigate()
  };
};

export const NewAccountContainer = connect(null, mapDispatchToProps)(NewAccount);
