import { Pane } from 'evergreen-ui';
import React from 'react';
import { createDate } from '../../../utils/date.utils';
import { AccountActions } from '../account-actions/account-actions.component';
import { AccountBalanceLineChart } from '../account-balance-line-chart.component';
import { AccountCategoryTotalsChart } from '../account-category-totals-chart.component';
import { AccountDetailSummary } from '../account-detail-summary.component';
import { AccountMonthlyContainer } from '../account-monthly/account-monthly.container';
import { EmptyAccount } from '../empty-account/empty-account.component';
import { MonthYearList } from '../month-year-list/month-year-list.component';
import { IAccountProps } from './account.props.interface';

// TODO clean up the account id, date, state selector passed to the 3 containers.
export const Account = ({ accountId, hasRecords, startingDate, monthAndYears, archived }: IAccountProps) => {
    const [date, setDate] = React.useState(startingDate);
    const [filterDescription, setFilteredDescription] = React.useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>('');

    // Always reset the date when changing accounts.
    React.useEffect(() => {
        setDate(startingDate);
    }, [accountId]);

    // Only reset the date when the selected date is greater
    // than the starting date of the account. This would occur
    // when deleting a record. This way you aren't left on a month
    // you shouldn't even be able to select.
    React.useEffect(() => {
        if (createDate(date) > createDate(startingDate)) {
            setDate(startingDate);
        }
    }, [startingDate]);

    if (!hasRecords) {
        return <EmptyAccount accountId={accountId} />;
    }

    return (
        <Pane display='grid' gridTemplateColumns='auto 1fr' height='100%'>
            <Pane padding={10} borderRight='1px solid #DDD'>
                {/* MonthYearList doesn't re-render if 2 accounts have the same starting date and monthAndYears. */}
                {/* Use the accountId as the key to reset the component. */}
                <MonthYearList key={accountId} monthAndYears={monthAndYears} startingDate={date} setDate={setDate} />
            </Pane>

            <Pane padding={20} overflowX='hidden' overflowY='auto' className='scroll-bar-styled'>
                <Pane display='flex'>
                    <AccountBalanceLineChart accountId={accountId} date={date} />
                    <AccountCategoryTotalsChart accountId={accountId} date={date} />
                </Pane>
                <Pane display='grid'>
                    <AccountDetailSummary accountId={accountId} date={date} archived={archived} />
                    {/* TODO if this was a container, this could get this flag itself... */}
                    {!archived && (
                        <AccountActions
                            accountId={accountId}
                            filterDescription={filterDescription}
                            setFilterDescription={setFilteredDescription}
                            selectedCategoryId={selectedCategoryId}
                            setSelectedCategoryId={setSelectedCategoryId}
                        />
                    )}
                    <AccountMonthlyContainer
                        accountId={accountId}
                        date={date}
                        archived={archived}
                        filterCategoryId={selectedCategoryId}
                        filterDescription={filterDescription}
                    />
                </Pane>
            </Pane>
        </Pane>
    );
};
