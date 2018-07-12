import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SidebarLayout } from '../_sidebar_/sidebar.layout';
import { HomeLayout } from '../_home_/home.layout';
import { ManageAccountLayout } from '../manage-accounts/manage-accounts.layout';
import { ManageCategoryLayout } from '../manage-categories/manage-categories.layout';
import { AccountLayout } from '../account/account.layout';
import { UploadContainer } from '../upload/upload.container';
import './root.layout.scss';

export class RootLayout extends React.Component {
  render() {
    return (
      <div className="root">
        <SidebarLayout />
        <div className="main-content scroll-bar-styled">
          <Switch>
            <Route exact path="/" component={HomeLayout} />
            <Route exact path="/accounts" component={ManageAccountLayout} />
            <Route exact path="/categories" component={ManageCategoryLayout} />
            <Route exact path="/account/:accountId" component={AccountLayout} />
            <Route exact path="/upload" component={UploadContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}
