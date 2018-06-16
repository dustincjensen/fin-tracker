import * as React from 'react';
import { withRouter } from 'react-router';
import Tabs from '../../components/tabs/tabs.component';
import { ITab } from '../../components/tabs/tabs.props';
import { monthNamesShort } from '../../utils/date.util';
import AccountMonthly from '../../containers/account-monthly.container';
import { ByAccountIdAndDate } from '../../store/records/records.selectors';

class AccountLayoutClass extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tabs: monthNamesShort().map((m: string) => {
        const t: ITab = {
          id: m,
          display: m,
          active: false
        };

        if (m === 'May') t.active = true;

        return t;
      }),
      date: '2018-05-01'
    }
  }

  selectTabFunc = (tabId: string) => {
    const { tabs } = this.state;
    tabs.forEach(t => t.active = false);
    const month = tabs.filter(t => t.id === tabId)[0];
    month.active = true;
    this.setState({
      tabs,
      date: `1 ${month.display} 2018`
    });
  }

  render() {
    return (
      <div>
        <Tabs tabs={this.state.tabs} selectTab={this.selectTabFunc} />
        <AccountMonthly accountId={this.props.match.params.accountId} date={this.state.date} stateSelector={ByAccountIdAndDate} />
      </div>
    );
  }
}

export const AccountLayout = withRouter(AccountLayoutClass);
