import * as React from 'react';

import './sidebar.layout.scss';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <Link className="btn btn-success sidebar-btn-width" to="/new-account">New Account</Link>
        <Link className="btn btn-primary sidebar-btn-width" to="/">Home</Link>
      </div>
    );
  }
}
