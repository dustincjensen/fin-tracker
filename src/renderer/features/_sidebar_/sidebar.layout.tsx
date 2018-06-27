import * as React from 'react';
import { Link } from 'react-router-dom';
import { AccountsSidebarLayout } from '../accounts-sidebar/accounts-sidebar.layout';
import './sidebar.layout.scss';

export class SidebarLayout extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <Link className="btn btn-primary sidebar-btn-width" to="/">Home</Link>
        <Link className="btn btn-success sidebar-btn-width" to="/accounts">Accounts</Link>
        <Link className="btn btn-success sidebar-btn-width" to="/categories">Categories</Link>
        <AccountsSidebarLayout />
        <Link className="btn btn-success sidebar-btn-width" to="/upload">Upload</Link>
      </div>
    );
  }
}
