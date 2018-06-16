import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../store/store.interface';
import { AccountLinks } from '../components/account-links/account-links.component';
import { IAccountProps } from '../components/account-links/account-links.interface';

const mapStateToProps = (state: IStore): IAccountProps => {
  return { accounts: state.accounts };
};

export const AccountsSidebarContainer = connect(mapStateToProps)(AccountLinks);
