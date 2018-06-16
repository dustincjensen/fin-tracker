import * as React from 'react';
import { Link } from 'react-router-dom';
import { AccountsSidebarContainer } from '../../containers/accounts-sidebar.container';
import './sidebar.layout.scss';

export class SidebarLayout extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <Link className="btn btn-primary sidebar-btn-width" to="/">Home</Link>
        <Link className="btn btn-success sidebar-btn-width" to="/new-account">New Account</Link>
        <Link className="btn btn-success sidebar-btn-width" to="/categories">Categories</Link>
        <AccountsSidebarContainer />
      </div>
    );
  }
}
