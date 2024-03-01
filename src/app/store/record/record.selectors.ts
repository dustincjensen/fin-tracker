import { createSelector } from 'reselect';
import { Record } from '../../models/record.type';
import { sortByDateDescending } from '../../utils/record.utils';
import { AccountSelectors } from '../account/account.selectors';
import { IStore } from '../store.interface';

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
        (_state: IStore, _accountId: string, categoryId: string) => categoryId,
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
    public static recordsByAccountId(state: IStore, accountId: string): Record[] {
        return state.records.records[accountId];
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
