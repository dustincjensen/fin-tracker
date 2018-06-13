import * as React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.layout.scss';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <Link className="btn btn-primary sidebar-btn-width" to="/">Home</Link>
        <Link className="btn btn-success sidebar-btn-width" to="/new-account">New Account</Link>
        <Link className="btn btn-success sidebar-btn-width" to="/categories">Categories</Link>
      </div>
    );
  }
}
