import * as React from 'react';
import { Route, Switch } from 'react-router';
import Sidebar from '../sidebar/sidebar.layout';
import Home from '../home/home.layout';
import NewAccount from '../new-account/new-account.layout';
import { CategoryLayout } from '../category/category.layout';
import './root.layout.scss';


export default class RootLayout extends React.Component {
  render() {
    return (
      <div className="root">
        <Sidebar />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-account" component={NewAccount} />
            <Route exact path="/categories" component={CategoryLayout} />
          </Switch>
        </div>
      </div>
    );
  }
}
