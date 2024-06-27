import { createStore } from 'redux';
import { categorySort } from '../hooks/categories/category-sort';
import { Account } from '../models/account.type';
import { AccountSelectors } from './account/account.selectors';
import { addTransferCategory } from './category/category-slice';
import { CategorySelectors } from './category/category.selectors';
import { rootReducer } from './store';
import { IPersistedStore } from './store.interface';

/**
 * 1.1.0 Migration
 * Adds account transfer categories for existing accounts.
 * Each transaction should be marked including transfers/payments
 * between accounts. These categories will allow for that.
 */
const migration_1_1_0 = storage => {
    const tmpStore = createStore(rootReducer, storage.get('state') || {});
    const state = tmpStore.getState();

    // Add Transfer categories for each account that exists but does not have one yet.
    const accounts = AccountSelectors.accounts(state);
    const categories = Object.keys(CategorySelectors.categories(state))
        .map(id => categories[id])
        .sort(categorySort);
    for (const accountId of Object.keys(accounts)) {
        console.log('Checking accountId: ', accountId);
        if (!categories.find(c => c.accountTransferId === accountId)) {
            console.log('Dispatching new account transfer category', accountId);
            tmpStore.dispatch(addTransferCategory(accounts[accountId]));
        }
    }

    // Add the external transfer category...
    if (!categories.find(c => c.accountTransferId === '__EXTERNAL_ACCOUNT__')) {
        console.log('Adding __EXTERNAL_ACCOUNT__ transfer category');
        tmpStore.dispatch(addTransferCategory({ id: '__EXTERNAL_ACCOUNT__', name: 'External Account' } as Account));
    }

    const newState = tmpStore.getState();
    const persistedState: IPersistedStore = {
        accounts: newState.accounts,
        autoCategories: newState.autoCategories,
        categories: newState.categories,
        investmentRecords: newState.investmentRecords,
        records: newState.records,
        thirdPartyApi: newState.thirdPartyApi,
    };
    storage.set('state', persistedState);
    storage.set('migrationVersion', '1.1.0');
};

export const migrations = {
    '>= 1.1.0': migration_1_1_0,
};
