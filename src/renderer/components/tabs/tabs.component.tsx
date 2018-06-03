import * as React from 'react';
import TabsProps from './tabs.props';

import './tabs.scss';

export default class Tabs extends React.Component<TabsProps> {
  render() {
    const { selectTab } = this.props;
    const tabs = this.props.tabs.map(t => {
      return (
        <li
          key={t.id}
          className={`tab-link ${t.active ? 'active' : ''}`}
          onClick={() => selectTab(t.id)}>
          {t.display}
        </li>
      );
    });

    return (
      <ul className="tabs">{tabs}</ul>
    );
  }

  selectTab = (id: number) => {
    this.props.selectTab(id);
  };
}
