import { Pane, Tab, Tablist } from 'evergreen-ui';
import * as React from 'react';
import { withRouter } from 'react-router';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { RecordSelectors } from '../../store/record/record.selectors';
import { monthNamesShort } from '../../utils/date.util';
import { AccountMonthlyBalanceChartContainer } from './account-monthly-balance-chart.container';
import { AccountMonthlyCategoryTotalsChartContainer } from './account-monthly-category-totals-chart.container';
import { AccountMonthlyContainer } from './account-monthly.container';
import { AccountMonthsComparisonContainer } from './account-months-comparison.container';
import { IAccountProps } from './account.props.interface';
import { IAccountState } from './account.state.interface';

class AccountLayoutClass extends React.Component<IAccountProps, IAccountState> {
  constructor(props) {
    super(props);
    this.state = {
      tabs: monthNamesShort(),
      date: '2018-01-01',
      selectedIndex: 0,
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
      <ErrorBoundary>
        <Pane>
          <Pane display='flex'>
            <AccountMonthlyBalanceChartContainer
              accountId={accountId}
              date={date}
              stateSelector={RecordSelectors.recordsByDate}
            />
            <AccountMonthlyCategoryTotalsChartContainer
              accountId={accountId}
              date={date}
              stateSelector={RecordSelectors.recordsByDate}
            />
          </Pane>
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
            <AccountMonthlyContainer accountId={accountId} date={date} stateSelector={RecordSelectors.recordsByDate} />
          </Pane>
        </Pane>
      </ErrorBoundary>
    );
  }
}

export const AccountLayout = withRouter(AccountLayoutClass);
