import { Pane, Text } from 'evergreen-ui';
import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { createDate } from '../../../utils/date.utils';
import { isNullOrUndefined } from '../../../utils/object.utils';
import { DateCurriedQuery, queryByIsInYear, queryByIsInYearAndMonth } from '../combined.utils';
import { TotalContext } from './total.context';

const selectAccountBalances = (query: DateCurriedQuery, dates: string[]) =>
  createSelector(AccountSelectors.account, RecordSelectors.recordsByAccountId, (account, records) => {
    const endAccountBalancesByDate = [];
    for (let index = 0; index < dates.length; index++) {
      const date = dates[index];

      // Only need to create this date once for each check against the accounts records.
      const curriedQuery = query(date);
      const currentDate = createDate(date);

      const { archived, endYear, endMonth } = account;

      // Check if the account is archived and if so, get the end date.
      // If we are dealing with a date that is greater than the end date of the account
      // then we put undefined and move on. This results in a '-' instead of continuing zeroes.
      const accountEndDate = archived ? createDate(`${endYear}-${endMonth + 1}`) : undefined;
      if (accountEndDate && currentDate > accountEndDate) {
        endAccountBalancesByDate.push({ date, total: undefined });
        continue;
      }

      let balance = records?.filter(r => curriedQuery(r.date)).pop()?.balance;

      // Get the balance from the previous date if the current date had no entries.
      if (isNullOrUndefined(balance) && index > 0) {
        balance = endAccountBalancesByDate[index - 1].total;
      }

      endAccountBalancesByDate.push({ date, total: isNullOrUndefined(balance) ? undefined : balance });
    }
    return endAccountBalancesByDate;
  });

const displayWidth = 300;

export const BankAccountRowSummary = ({
  accountId,
  byMonth,
  start,
  end,
  dates,
}: {
  accountId: string;
  byMonth: boolean;
  start: number;
  end: number;
  dates: string[];
}) => {
  const selectBalances = useMemo(
    () => selectAccountBalances(byMonth ? queryByIsInYearAndMonth : queryByIsInYear, dates),
    [byMonth, dates]
  );
  const balances = useSelector((state: IStore) => selectBalances(state, accountId));

  // Set the balances in the total context.
  const totalContext = React.useContext(TotalContext);
  totalContext.totals.push(balances.map(b => b.total));

  return (
    <Pane borderRadius={0} display='flex' flexDirection='row'>
      {balances.slice(start, end).map(bobj => {
        const balance = bobj.total;
        return (
          <Pane
            key={bobj.date}
            padding={10}
            borderBottom
            minWidth={displayWidth}
            height={40}
            borderLeft
            display='flex'
            justifyContent='flex-end'
          >
            <Text>{isNullOrUndefined(balance) ? '-' : balance?.toFixed(2)}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
};
