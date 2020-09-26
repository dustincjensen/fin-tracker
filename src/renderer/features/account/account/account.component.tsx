import { Pane, Tab, Tablist } from 'evergreen-ui';
import * as React from 'react';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { monthNamesShort, getMonthAndYearFromDate } from '../../../utils/date.util';
import { AccountMonthlyBalanceChartContainer } from '../account-balance-line-chart/account-monthly-balance-chart.container';
import { AccountMonthlyCategoryTotalsChartContainer } from '../account-category-totals-chart/account-monthly-category-totals-chart.container';
import { AccountMonthlyContainer } from '../account-monthly/account-monthly.container';
import { AccountMonthsComparisonContainer } from '../account-months-comparison/account-months-comparison.container';
import { EmptyAccount } from '../empty-account/empty-account.component';
import { IAccountProps } from './account.props.interface';

export const Account = ({ accountId, hasRecords, startingDate, years }: IAccountProps) => {
  const [month, year] = getMonthAndYearFromDate(startingDate);
  const [months, setMonths] = React.useState(monthNamesShort());
  const [date, setDate] = React.useState(startingDate);
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(month);
  const [selectedYearIndex, setSelectedYearIndex] = React.useState(years.indexOf(year.toString()));

  React.useEffect(() => {
    setMonths(monthNamesShort());
    setDate(startingDate);
    setSelectedMonthIndex(month);
    setSelectedYearIndex(years.indexOf(year.toString()));
  }, [accountId]);

  const selectMonth = (month: string, index: number) => {
    setDate(`1 ${month} ${years[selectedYearIndex]}`);
    setSelectedMonthIndex(index);
  };

  const selectYear = (year: string, index: number) => {
    const months = monthNamesShort();
    setDate(`1 ${months[selectedMonthIndex]} ${year}`);
    setSelectedYearIndex(index);
  };

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
          {years.map((year, index) => (
            <Tab
              key={year}
              id={year}
              onSelect={() => selectYear(year, index)}
              isSelected={index === selectedYearIndex}
              width='100%'
            >
              {year}
            </Tab>
          ))}
        </Tablist>
        <Tablist display='flex' justifyContent='space-around' marginBottom={2}>
          {months.map((month, index) => (
            <Tab
              key={month}
              id={month}
              onSelect={() => selectMonth(month, index)}
              isSelected={index === selectedMonthIndex}
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
};
