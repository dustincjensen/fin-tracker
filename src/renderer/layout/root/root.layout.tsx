import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SidebarLayout } from '../sidebar/sidebar.layout';
import { HomeLayout } from '../home/home.layout';
import { NewAccountLayout } from '../new-account/new-account.layout';
import { CategoryLayout } from '../category/category.layout';
import { AccountLayout } from '../account/account.layout';
import './root.layout.scss';

export class RootLayout extends React.Component {
  render() {
    return (
      <div className="root">
        <SidebarLayout />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={HomeLayout} />
            <Route exact path="/new-account" component={NewAccountLayout} />
            <Route exact path="/categories" component={CategoryLayout} />
            <Route exact path="/account/:accountId" component={AccountLayout} />
          </Switch>
        </div>
      </div>
    );
  }
}
