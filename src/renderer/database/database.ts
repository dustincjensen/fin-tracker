import Dexie from 'dexie';
import { Dispatch } from 'redux';
import { AccountActions } from '../store/account/account.actions';
import { IAccount } from '../store/account/account.interface';
import { AppActions } from '../store/app/app.actions';
import { AutoCategoryActions } from '../store/auto-category/auto-category.actions';
import { IAutoCategory } from '../store/auto-category/auto-category.interface';
import { CategoryActions } from '../store/category/category.actions';
import { ICategory } from '../store/category/category.interface';
import { RecordActions } from '../store/record/record.actions';
import { IRecord } from '../store/record/record.interface';
import { IStore } from '../store/store.interface';

class AppDatabase extends Dexie {
  accounts: Dexie.Table<IAccount, string>;
  categories: Dexie.Table<ICategory, string>;
  autoCategories: Dexie.Table<IAutoCategory, string>;
  records: Dexie.Table<IRecord & { order: number }, string>;

  constructor() {
    super('fintracker-db');
    this.version(1).stores({
      accounts: 'id, name, startingBalance, startYear, startMonth, endYear, endMonth, accountType',
      categories: 'id, name, color',
      autoCategories: 'id, accountId, categoryId, description',
      records:
        'id, order, accountId, date, description, details, splitRecords, categoryId, autoCategoryId, debit, credit, balance',
    });
  }

  public loadExistingData = async (existingState: IStore) => {
    const dbExists = await Dexie.exists('fintracker-db');

    if (dbExists) {
      // Transfer accounts
      for (const accountId in existingState.accounts.accounts) {
        const account = existingState.accounts.accounts[accountId];
        this.accounts.put(account);
      }

      // Transfer categories
      for (const categoryId in existingState.categories.categories) {
        const category = existingState.categories.categories[categoryId];
        this.categories.put(category);
      }

      // Transfer autoCategories
      for (const accountId in existingState.autoCategories.autoCategories) {
        const autoCategories = existingState.autoCategories.autoCategories[accountId];
        for (const autoCategory of autoCategories) {
          this.autoCategories.put(autoCategory);
        }
      }

      // Transfer records
      for (const accountId in existingState.records.records) {
        const records = existingState.records.records[accountId];
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          this.records.put({ ...record, order: i });
        }
      }
    }
  };

  public initialize = async (dispatch: Dispatch) => {
    const accountsPromise = this.accounts.toArray();
    const categoriesPromise = this.categories.toArray();
    const autoCategoriesPromise = this.autoCategories.toArray();
    const recordsPromise = this.records.orderBy('order').toArray();

    const [accounts, categories, autoCategories, records] = await Promise.all([
      accountsPromise,
      categoriesPromise,
      autoCategoriesPromise,
      recordsPromise,
    ]);

    dispatch({ type: AccountActions.LOAD_ACCOUNTS, payload: accounts });
    dispatch({ type: CategoryActions.LOAD_CATEGORIES, payload: categories });
    dispatch({ type: AutoCategoryActions.LOAD_AUTO_CATEGORIES, payload: autoCategories });
    dispatch({ type: RecordActions.LOAD_RECORDS, payload: records });
    dispatch({ type: AppActions.INITIALIZED });
  };
}

export const database = new AppDatabase();
