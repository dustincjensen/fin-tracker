import { remote } from 'electron';
import { Button, Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AccountsSidebarLayout } from '../accounts-sidebar/accounts-sidebar.layout';

const appVersion = remote.app.getVersion();

export class SidebarLayout extends React.Component {
  render() {
    return (
      <Pane background='tint1' display='grid' gridTemplateRows='auto 1fr auto auto auto' padding={20} borderRight>
        <Button is={Link} appearance='minimal' to='/' iconBefore='home'>
          Home
        </Button>
        <AccountsSidebarLayout />
        <Button is={Link} appearance='minimal' to='/accounts' iconBefore='bank-account'>
          Accounts
        </Button>
        <Button is={Link} appearance='minimal' to='/categories' iconBefore='group-objects'>
          Categories
        </Button>
        <Button is={Link} appearance='minimal' to='/autoCategories' iconBefore='automatic-updates'>
          Auto Categories
        </Button>
        <Button is={Link} appearance='minimal' to='/import' iconBefore='import'>
          Import
        </Button>
        <Text paddingTop={20} size={300} textAlign='center'>
          Version: {appVersion}
        </Text>
      </Pane>
    );
  }
}
