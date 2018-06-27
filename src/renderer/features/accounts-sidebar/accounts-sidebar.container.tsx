import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { AccountLinks } from './account-links.component';
import { IAccountProps } from './account-links.component.interface';

const mapStateToProps = (state: IStore): IAccountProps => {
  return { accounts: state.accounts };
};

export const AccountsSidebarContainer = connect(mapStateToProps)(AccountLinks);
