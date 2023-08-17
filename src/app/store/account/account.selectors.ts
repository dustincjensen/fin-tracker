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
}
