import * as React from 'react';
import { ITabsProps } from './tabs.interface';
import './tabs.scss';

export class Tabs extends React.Component<ITabsProps> {
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
