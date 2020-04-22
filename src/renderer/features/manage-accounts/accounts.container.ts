import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountActions } from '../../store/account/account.actions';
import { IAccount } from '../../store/account/account.interface';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IStore } from '../../store/store.interface';
import { Accounts } from './accounts.component';
import { IAccountDispatchProps, IAccountStateProps } from './accounts.props.interface';

const mapStateToProps = (state: IStore): IAccountStateProps => ({
  accounts: AccountSelectors.selectAccounts(state),
});

const mapDispatchToProps = (dispatch: Dispatch): IAccountDispatchProps => ({
  deleteAccount: (account: IAccount) => dispatch(AccountActions.deleteAccount(account)),
});

export const AccountsContainer = connect(mapStateToProps, mapDispatchToProps)(Accounts);
