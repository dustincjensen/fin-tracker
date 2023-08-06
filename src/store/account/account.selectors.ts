import { createSelector } from 'reselect';
import { IStore } from '../store.interface';

export class AccountSelectors {
    /**
     * Returns all accounts.
     *
     * @param state   The current application state.
     */
    public static accounts(state: IStore) {
        return state.accounts.accounts;
    }

    /**
     * Returns a specific account by ID.
     *
     * @param state   The current application state.
     * @param id      The ID of the account.
     */
    public static account(state: IStore, id: string) {
        return state.accounts.accounts[id];
    }

    /**
     * Returns an array of account ID's and names.
     *
     * @deprecated Do not use.
     */
    public static selectAccountNames = createSelector(AccountSelectors.accounts, accounts => {
        return Object.keys(accounts).map(id => {
            const { name } = accounts[id];
            return {
                id,
                accountName: name,
            };
        });
    });
}
