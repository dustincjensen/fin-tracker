import { IAccountStore } from './account/account.store.interface';
import { IAutoCategoryStore } from './auto-category/auto-category.store.interface';
import { ICategoryStore } from './category/category.store.interface';
import { IPendingRecordStore } from './pending-record/pending-record.store.interface';
import { IRecordStore } from './record/record.store.interface';

export interface IStore {
  accounts: IAccountStore;
  autoCategories: IAutoCategoryStore;
  categories: ICategoryStore;
  pendingRecords: IPendingRecordStore;
  records: IRecordStore;
}

/**
 * The store interface for what data should be persisted.
 */
export interface IPersistedStore {
  accounts: IAccountStore;
  autoCategories: IAutoCategoryStore;
  categories: ICategoryStore;
  records: IRecordStore;
}
