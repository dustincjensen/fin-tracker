import * as React from 'react';
import { Route, Switch } from 'react-router';
import { AccountLayout } from '../account/account.layout';
import { HomeLayout } from '../home/home.layout';
import { ImportContainer } from '../import/import.container';
import { ManageAccountLayout } from '../manage-accounts/manage-accounts.layout';
import { ManageCategoryLayout } from '../manage-categories/manage-categories.layout';
import { SidebarLayout } from '../sidebar/sidebar.layout';
import './root.layout.scss';

export class RootLayout extends React.Component {
  render() {
    return (
      <div className='root'>
        <SidebarLayout />
        <div className='main-content scroll-bar-styled'>
          <Switch>
            <Route exact path='/' component={HomeLayout} />
            <Route exact path='/accounts' component={ManageAccountLayout} />
            <Route exact path='/categories' component={ManageCategoryLayout} />
            <Route exact path='/account/:accountId' component={AccountLayout} />
            <Route exact path='/import' component={ImportContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}
