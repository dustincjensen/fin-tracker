import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { AccountMonthlyBalanceChartContainer } from '../account-balance-line-chart/account-monthly-balance-chart.container';
import { AccountMonthlyCategoryTotalsChartContainer } from '../account-category-totals-chart/account-monthly-category-totals-chart.container';
import { AccountDetailSummaryContainer } from '../account-detail-summary/account-detail-summary.container';
import { AccountMonthlyContainer } from '../account-monthly/account-monthly.container';
import { EmptyAccount } from '../empty-account/empty-account.component';
import { MonthYearList } from '../month-year-list/month-year-list.component';
import { IAccountProps } from './account.props.interface';

// TODO clean up the account id, date, state selector passed to the 3 containers.
export const Account = ({ accountId, hasRecords, startingDate, monthAndYears }: IAccountProps) => {
  const [date, setDate] = React.useState(startingDate);

  React.useEffect(() => {
    setDate(startingDate);
  }, [accountId]);

  if (!hasRecords) {
    return <EmptyAccount accountId={accountId} />;
  }

  return (
    <Pane display='grid' gridTemplateColumns='auto 1fr' height='100%'>
      <Pane padding={10} borderRight='1px solid #DDD'>
        {/* MonthYearList doesn't re-render if 2 accounts have the same starting date and monthAndYears. */}
        {/* Use the accountId as the key to reset the component. */}
        <MonthYearList key={accountId} monthAndYears={monthAndYears} startingDate={startingDate} setDate={setDate} />
      </Pane>

      <Pane padding={20} overflowX='hidden' overflowY='auto' className='scroll-bar-styled'>
        <Pane display='flex'>
          <AccountMonthlyBalanceChartContainer accountId={accountId} date={date} />
          <AccountMonthlyCategoryTotalsChartContainer accountId={accountId} date={date} />
        </Pane>
        <Pane display='grid'>
          <AccountDetailSummaryContainer accountId={accountId} date={date} />
          <AccountMonthlyContainer accountId={accountId} date={date} />
        </Pane>
      </Pane>
    </Pane>
  );
};
