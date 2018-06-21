import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SidebarLayout } from '../sidebar/sidebar.layout';
import { HomeLayout } from '../home/home.layout';
import { ManageAccountLayout } from '../account/manage-accounts.layout';
import { ManageCategoryLayout } from '../category/manage-categories.layout';
import { AccountLayout } from '../account/account.layout';
import { UploadLayout } from '../upload/upload.layout';
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
            <Route exact path="/upload" component={UploadLayout} />
          </Switch>
        </div>
      </div>
    );
  }
}
