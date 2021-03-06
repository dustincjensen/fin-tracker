import { connect } from 'react-redux';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { IStore } from '../../../store/store.interface';
import { Accounts } from './accounts.component';
import { IAccountProps } from './accounts.props.interface';

type StateProps = IAccountProps;

const mapStateToProps = (state: IStore): StateProps => ({
  accounts: AccountSelectors.selectAccounts(state),
});

export const AccountsContainer = connect(mapStateToProps)(Accounts);
