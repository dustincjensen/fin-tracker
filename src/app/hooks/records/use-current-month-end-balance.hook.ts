import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Account } from '../../models/account.type';
import { Record } from '../../models/record.type';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { getAccountStartDate } from '../../utils/account.utils';
import { createDate, getPreviousMonth } from '../../utils/date.utils';
import { recordsByDate } from './use-records-by-date.hook';

const currentMonthEndBalance = (account: Account, records: Record[], date: string): number | undefined => {
    const monthsRecords = recordsByDate(records, date);
    if (monthsRecords.length > 0) {
        return monthsRecords[monthsRecords.length - 1]?.balance;
    }

    // The month did not have records. Try again with the previous month,
    // but only if we are still after the start date of the account.
    const accountStartDate = createDate(getAccountStartDate(account.startYear, account.startMonth));
    const previousMonth = getPreviousMonth(date);

    if (accountStartDate <= createDate(previousMonth)) {
        return currentMonthEndBalance(account, records, previousMonth);
    }

    return undefined;
};

/**
 * Returns the balance of the account up to the end of the given year and month.
 *
 * @param accountId   The ID of the account.
 * @param date        The year/month to get the balance for.
 */
export const useCurrentMonthEndBalance = (accountId: string, date: string) => {
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const records = useSelector((state: IStore) => RecordSelectors.recordsByAccountId(state, accountId));
    return {
        balance: useMemo(() => currentMonthEndBalance(account, records, date), [account, records, date]),
    };
};
