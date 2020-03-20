import { Button, Pane } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AccountsSidebarLayout } from '../accounts-sidebar/accounts-sidebar.layout';
import './sidebar.layout.scss';

export class SidebarLayout extends React.Component {
  render() {
    return (
      <Pane background='tint1' className='sidebar' borderRight>
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
        <Button is={Link} appearance='minimal' to='/import' iconBefore='import'>
          Import
        </Button>
      </Pane>
    );
  }
}