import * as React from 'react';

import './sidebar.layout.scss';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <button className="btn btn-success">New Account</button>
      </div>
    );
  }
}
