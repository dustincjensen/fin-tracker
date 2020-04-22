import { connect } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IStore } from '../../store/store.interface';
import { AccountsSidebar } from './accounts-sidebar.component';
import { IAccountsSidebarStateProps } from './accounts-sidebar.props.interface';

const mapStateToProps = (state: IStore): IAccountsSidebarStateProps => {
  return { accounts: AccountSelectors.selectAccounts(state) };
};

export const AccountsSidebarContainer = connect(mapStateToProps)(AccountsSidebar);
