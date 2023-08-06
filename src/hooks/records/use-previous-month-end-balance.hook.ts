import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IAccount } from '../../store/account/account.interface';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IRecord } from '../../store/record/record.interface';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { getAccountStartDate } from '../../utils/account.utils';
import { createDate, getPreviousMonth } from '../../utils/date.utils';
import { recordsByDate } from './use-records-by-date.hook';

const previousMonthEndBalance = (account: IAccount, records: IRecord[], date: string): number | undefined => {
    const previousMonth = getPreviousMonth(date);
    const previousMonthRecords = recordsByDate(records, previousMonth);
    if (previousMonthRecords.length > 0) {
        return previousMonthRecords[previousMonthRecords.length - 1]?.balance;
    }

    // The month before the provided date did not have records. Try again with the month
    // before the previous month, but only if we are still after the start date of the account.
    const accountStartDate = createDate(getAccountStartDate(account.startYear, account.startMonth));
    if (accountStartDate <= createDate(previousMonth)) {
        return previousMonthEndBalance(account, records, previousMonth);
    }

    return undefined;
};

/**
 * Returns the balance of the account up to the end of the month before the given year and month.
 *
 * @param accountId   The ID of the account.
 * @param date        The year/month to get the balance for.
 */
export const usePreviousMonthEndBalance = (accountId: string, date: string) => {
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const records = useSelector((state: IStore) => RecordSelectors.recordsByAccountId(state, accountId));
    return {
        balance: useMemo(() => previousMonthEndBalance(account, records, date), [account, records, date]),
    };
};
