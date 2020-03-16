import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { IAccount } from '../../store/account/account.interface';
import { Accounts } from './accounts.component';
import { IAccountDispatchProps, IAccountStateProps } from './accounts.props.interface';
import { Dispatch } from 'redux';
import { DeleteAccount } from '../../store/account/account.actions';

const mapStateToProps = (state: IStore): IAccountStateProps => {
  const accounts: IAccount[] = Object.keys(state.accounts).map(id => state.accounts[id]);

  return {
    accounts
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IAccountDispatchProps => {
  return {
    deleteAccount: (accountId: string) => dispatch(DeleteAccount(accountId))
  };
}

export const AccountsContainer = connect(mapStateToProps, mapDispatchToProps)(Accounts);
