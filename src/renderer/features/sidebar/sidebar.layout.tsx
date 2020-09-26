import { remote } from 'electron';
import { Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import {NavLink} from '../../components/nav-link/nav-link.component';
import { AccountsSidebar } from '../accounts-sidebar/accounts-sidebar.component';

const appVersion = remote.app.getVersion();

export const SidebarLayout = () => {
  return (
    <Pane background='tint1' display='grid' gridTemplateRows='auto 1fr auto auto auto' padding={20} borderRight>
      <NavLink to='/' iconBefore='home' text='Home' />
      <AccountsSidebar />
      <NavLink to='/accounts' iconBefore='bank-account' text='Accounts' />
      <NavLink to='/categories' iconBefore='group-objects' text='Categories' />
      <NavLink to='/autoCategories' iconBefore='automatic-updates' text='Auto Categories' />
      <NavLink to='/import' iconBefore='import' text='Import' />
      <Text paddingTop={20} size={300} textAlign='center'>
        Version: {appVersion}
      </Text>
    </Pane>
  );
};
