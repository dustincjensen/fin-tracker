import { createSelector } from 'reselect';
import { createDate, isInYearMonth } from '../../utils/date.utils';
import { sortByDateDescending } from '../../utils/record.utils';
import { AccountSelectors } from '../account/account.selectors';
import { IStore } from '../store.interface';
import { IRecord } from './record.interface';

export class RecordSelectors {
    /**
     * Returns all records.
     *
     * @param state   The current application state.
     */
    public static records(state: IStore) {
        return state.records.records;
    }

    /**
     * @deprecated Do not use.
     */
    public static selectAllRecordsAcrossAccounts = createSelector(RecordSelectors.records, records => {
        return Object.keys(records)
            .map(id => records[id])
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
    });

    /**
     * @deprecated Do not use.
     */
    public static selectAllRecordsWithCategory = createSelector(
        RecordSelectors.selectAllRecordsAcrossAccounts,
        RecordSelectors.recordsByAccountId,
        AccountSelectors.accounts,
        (state: IStore, accountId: string, categoryId: string) => categoryId,
        (records, recordsForInvestment, accounts, categoryId) => {
            return [...records.filter(r => r.categoryId === categoryId), ...(recordsForInvestment || [])]
                .map(r => {
                    return {
                        ...r,
                        accountName: accounts[r.accountId].name,
                    };
                })
                .sort(sortByDateDescending);
        }
    );

    /**
     * Returns the records for a specific account.
     *
     * @param state       The current application state.
     * @param accountId   The ID of the account.
     */
    public static recordsByAccountId(state: IStore, accountId: string): IRecord[] {
        return state.records.records[accountId];
    }

    /**
     * Returns the records for a specific account in the given year and month.
     * TODO this creates a new array every time it is used.
     *
     * @param state       The current application state.
     * @param accountId   The ID of the account.
     * @param date        The year/month to get records for.
     */
    public static recordsByDate(state: IStore, accountId: string, date: string): IRecord[] {
        const records = state.records.records[accountId];
        const targetDate = createDate(date);
        return records?.filter(r => isInYearMonth(targetDate, createDate(r.date)));
    }

    /**
     * Returns the balance of the last record in the account.
     * This should be the account balance.
     *
     * @param state       The current application state.
     * @param accountId   The ID of the account.
     */
    public static currentBalance(state: IStore, accountId: string): number {
        const records = RecordSelectors.recordsByAccountId(state, accountId);
        return records?.[records.length - 1]?.balance;
    }
}
