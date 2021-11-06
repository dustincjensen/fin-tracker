import { Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { InvestmentRecordSelectors } from '../../../store/investment-record/investment-record.selectors';
import { IStore } from '../../../store/store.interface';
import { createDate } from '../../../utils/date.utils';
import { isNullOrUndefined } from '../../../utils/object.utils';
import { DateCurriedQuery, queryByIsInYear, queryByIsInYearAndMonth } from '../combined.utils';
import { TotalContext } from './total.context';

const selectAccountBalances = (query: DateCurriedQuery, dates: string[]) =>
  createSelector(
    AccountSelectors.account,
    InvestmentRecordSelectors.recordsByAccountId,
    (account, records) => {
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
          endAccountBalancesByDate.push({ date, cadTotal: undefined, usdTotal: undefined });
          continue;
        }

        const investRecords = records ? [...records] : [];
        // TODO better way to sort?
        investRecords.sort((a, b) => createDate(a.date) > createDate(b.date) ? 1 : -1);

        const balances = investRecords?.filter(r => curriedQuery(r.date));
        let cadBalance = balances?.filter(r => r.investmentCurrency === 'CAD').pop()?.balance;
        let usdBalance = balances?.filter(r => r.investmentCurrency === 'USD').pop()?.balance;

        // Get the balance from the previous date if the current date had no entries.
        if (isNullOrUndefined(cadBalance) && index > 0) {
          cadBalance = endAccountBalancesByDate[index - 1].cadTotal;
        }
        if (isNullOrUndefined(usdBalance) && index > 0) {
          usdBalance = endAccountBalancesByDate[index - 1].usdTotal;
        }

        endAccountBalancesByDate.push({ 
          date, 
          cadTotal: isNullOrUndefined(cadBalance) ? undefined : cadBalance,
          usdTotal: isNullOrUndefined(usdBalance) ? undefined : usdBalance
        });
      }
      return endAccountBalancesByDate;
    }
  );

const displayWidth = 300;

export const InvestmentAccountRowSummary = ({ accountId, byMonth, start, end, dates, rates }: any) => {
  const selectBalances = useMemo(() => selectAccountBalances(
    byMonth ? queryByIsInYearAndMonth : queryByIsInYear,
    dates
  ), [byMonth, dates]);
  const balances = useSelector((state: IStore) => selectBalances(state, accountId));

  let combinedBalances = [];
  const totalContext = React.useContext(TotalContext);

  // TODO this causing flashing when switching monthly to yearly... can we have a default value instead?
  if (rates && rates.length === dates.length) {
    combinedBalances = balances.map((b, i) => {
      if (isNullOrUndefined(b?.cadTotal) && isNullOrUndefined(b?.usdTotal)) {
        return {
          ...b,
          total: undefined
        };
      }

      return {
        ...b,
        total: (b?.cadTotal || 0.0) + (!isNullOrUndefined(b?.usdTotal) ? b?.usdTotal * parseFloat(rates[i].rate) : 0.0)
      };
    });

    // Set the totals in the context...
    totalContext.totals.push(combinedBalances.map(b => b.total));
  }
  else {
    // TODO better way to handle this?
    // NO API KEY is present so we will straight add the 2 balances together.

    combinedBalances = balances.map((b, i) => {
      if (isNullOrUndefined(b?.cadTotal) && isNullOrUndefined(b?.usdTotal)) {
        return {
          ...b,
          total: undefined
        };
      }

      return {
        ...b,
        total: (b?.cadTotal || 0.0) + (b?.usdTotal || 0.0)
      };
    });

    // Set the totals in the context...
    totalContext.totals.push(combinedBalances.map(b => b.total));
  }

  return (
    <Pane
      borderRadius={0}
      display='flex'
      flexDirection='row'
    >
      {combinedBalances.slice(start, end).map(({total, date}) => {
        return (
          <Pane
            key={date}
            padding={10}
            borderBottom
            minWidth={displayWidth}
            height={40}
            borderLeft
            display='flex'
            justifyContent='flex-end'
          >
            <Text>{isNullOrUndefined(total) ? '-' : `~ ${total?.toFixed(2)}`}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
};