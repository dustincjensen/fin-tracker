import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import {
    allMonthsBetweenDates,
    getEarliestDate,
    getLatestDate,
    getMonthAndYearFromDate,
    stringToDayMonthYear,
} from '../../utils/date.utils';

/**
 * Gets the information for the account component.
 *
 * @param accountId The ID of the account.
 */
export const useAccountComponent = (accountId: string) => {
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const records = useSelector((state: IStore) => RecordSelectors.recordsByAccountId(state, accountId));

    const monthAndYears = useMemo(() => {
        const recordDates = records?.map(r => r.date);
        // TODO this could probably be optimized, it currently has to call back into date utils far more than it should have to.
        return recordDates
            ? allMonthsBetweenDates(getEarliestDate(recordDates), getLatestDate(recordDates)).map(my =>
                  getMonthAndYearFromDate(my)
              )
            : [];
    }, [records]);

    const newestTransactionDate = records?.[records.length - 1]?.date;

    return {
        hasRecords: !!(records?.length > 0),
        startingDate: newestTransactionDate ? stringToDayMonthYear(newestTransactionDate) : undefined,
        monthAndYears,
        archived: !!account.archived,
    };
};
