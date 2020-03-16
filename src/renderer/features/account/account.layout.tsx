import * as React from 'react';
import { withRouter } from 'react-router';
import { monthNamesShort } from '../../utils/date.util';
import { AccountMonthlyContainer } from './account-monthly.container';
import { AccountMonthlyBalanceChartContainer } from './account-monthly-balance-chart.container';
import { ByAccountIdAndDate } from '../../store/records/records.selectors';
import { AccountMonthsComparisonContainer } from './account-months-comparison.container';
import { Tablist, Pane, Tab } from 'evergreen-ui';

// TODO props and state interfaces
class AccountLayoutClass extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tabs: monthNamesShort(),
      date: '2018-05-01',
      selectedIndex: 4,
    };
  }

  selectTabFunc = (tab: string, index: number) => {
    this.setState({
      date: `1 ${tab} 2018`,
      selectedIndex: index,
    });
  };

  render() {
    const { accountId } = this.props.match.params;
    const { date } = this.state;

    return (
      <Pane>
        <AccountMonthlyBalanceChartContainer accountId={accountId} date={date} stateSelector={ByAccountIdAndDate} />
        <Pane display='grid'>
          <AccountMonthsComparisonContainer accountId={accountId} date={date} />
          <Tablist display='flex' justifyContent='space-around' marginBottom={2}>
            {this.state.tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => this.selectTabFunc(tab, index)}
                isSelected={index === this.state.selectedIndex}
                width='100%'
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          <AccountMonthlyContainer accountId={accountId} date={date} stateSelector={ByAccountIdAndDate} />
        </Pane>
      </Pane>
    );
  }
}

export const AccountLayout = withRouter(AccountLayoutClass);
