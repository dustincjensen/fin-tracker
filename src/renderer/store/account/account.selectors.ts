import { createSelector } from 'reselect';
import { isBankAccount } from '../../utils/account.utils';
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
   * Returns the array of accounts.
   */
  public static selectAccounts = createSelector(AccountSelectors.accounts, accounts =>
    Object.keys(accounts).map(id => accounts[id])
  );

  /**
   * Returns the array of active accounts.
   */
  public static selectActiveAccounts = createSelector(AccountSelectors.accounts, accounts =>
    Object.keys(accounts)
      .map(id => accounts[id])
      .filter(a => !a.archived)
  );

  /**
   * Returns the array of active, bank accounts.
   */
  public static selectActiveBankAccounts = createSelector(AccountSelectors.accounts, accounts => 
    Object.keys(accounts)
      .map(id => accounts[id])
      .filter(a => !a.archived && isBankAccount(a.accountType))
  );

  /**
   * Returns an array of account ID's and names.
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
