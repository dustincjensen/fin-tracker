import { Pane, Tab, Tablist } from 'evergreen-ui';
import * as React from 'react';
import { RecordSelectors } from '../../store/record/record.selectors';
import { monthNamesShort, getMonthAndYearFromDate } from '../../utils/date.util';
import { AccountMonthlyBalanceChartContainer } from './account-monthly-balance-chart.container';
import { AccountMonthlyCategoryTotalsChartContainer } from './account-monthly-category-totals-chart.container';
import { AccountMonthlyContainer } from './account-monthly.container';
import { AccountMonthsComparisonContainer } from './account-months-comparison.container';
import { IAccountProps } from './account.props.interface';
import { IAccountState } from './account.state.interface';
import { EmptyAccount } from './empty-account.component';

export class Account extends React.Component<IAccountProps, IAccountState> {
  constructor(props: IAccountProps) {
    super(props);
    this.state = this.getInitializedState(props);
  }

  public componentDidUpdate(prevProps: IAccountProps) {
    if (prevProps.accountId !== this.props.accountId) {
      this.setState(this.getInitializedState(this.props));
    }
  }

  private getInitializedState(props: IAccountProps): IAccountState {
    const { years, startingDate } = props;
    const [month, year] = getMonthAndYearFromDate(startingDate);
    return {
      date: startingDate,
      months: monthNamesShort(),
      // TODO should the selected indexes be managed by redux so when it rerenders it does the
      // record selecting for accounts once instead of twice?
      // I think it will happen twice right now since the date switches after the sub components
      // got the records for the month/year before it is changed by the state?
      selectedMonthIndex: month,
      selectedYearIndex: years.indexOf(year.toString()),
      years,
    };
  }

  selectMonth = (month: string, index: number) => {
    this.setState({
      date: `1 ${month} ${this.props.years[this.state.selectedYearIndex]}`,
      selectedMonthIndex: index,
    });
  };

  selectYear = (year: string, index: number) => {
    const months = monthNamesShort();
    this.setState({
      date: `1 ${months[this.state.selectedMonthIndex]} ${year}`,
      selectedYearIndex: index,
    });
  };

  render() {
    const { accountId, hasRecords } = this.props;
    const { date } = this.state;

    if (!hasRecords) {
      return <EmptyAccount accountId={accountId} />;
    }

    return (
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
            {this.props.years.map((year, index) => (
              <Tab
                key={year}
                id={year}
                onSelect={() => this.selectYear(year, index)}
                isSelected={index === this.state.selectedYearIndex}
                width='100%'
              >
                {year}
              </Tab>
            ))}
          </Tablist>
          <Tablist display='flex' justifyContent='space-around' marginBottom={2}>
            {this.state.months.map((month, index) => (
              <Tab
                key={month}
                id={month}
                onSelect={() => this.selectMonth(month, index)}
                isSelected={index === this.state.selectedMonthIndex}
                width='100%'
              >
                {month}
              </Tab>
            ))}
          </Tablist>
          <AccountMonthlyContainer accountId={accountId} date={date} stateSelector={RecordSelectors.recordsByDate} />
        </Pane>
      </Pane>
    );
  }
}
