import { remote } from 'electron';
import { Button, Heading, majorScale, Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from '../../components/nav-link/nav-link.component';
import { AccountsSidebar } from '../accounts-sidebar/accounts-sidebar.component';

const appVersion = remote.app.getVersion();

export const SidebarLayout = () => {
  const location = useLocation();
  return (
    <Pane background='tint1' display='grid' gridTemplateRows='auto auto 1fr auto auto' padding={20} borderRight>
      <Button
        is={Link}
        to='/import'
        iconBefore='import'
        height={majorScale(7)}
        marginBottom='15px'
        appearance={location.pathname === '/import' ? 'primary' : 'minimal'}
      >
        Import
      </Button>
      <NavLink to='/' iconBefore='home' text='Home' isSelected={location.pathname === '/'} />
      <AccountsSidebar />
      <Pane display='flex' flexDirection='column'>
        <Heading size={100} marginBottom='5px'>
          Settings
        </Heading>
        <NavLink to='/accounts' iconBefore='bank-account' text='Accounts' isSelected={location.pathname === '/accounts'} />
        <NavLink to='/categories' iconBefore='group-objects' text='Categories' isSelected={location.pathname === '/categories'} />
        <NavLink to='/autoCategories' iconBefore='automatic-updates' text='Auto Categories' isSelected={location.pathname === '/autoCategories'} />
      </Pane>
      <Text paddingTop={20} size={300} textAlign='center'>
        Version: {appVersion}
      </Text>
    </Pane>
  );
};
