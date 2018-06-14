import * as React from 'react';
import { ITabsProps } from './tabs.props';

import './tabs.scss';

export default class Tabs extends React.Component<ITabsProps> {
  render() {
    const { selectTab, tabs } = this.props;
    const tabsToRender = tabs.map(t => {
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
      <ul className="tabs">{tabsToRender}</ul>
    );
  }
}
