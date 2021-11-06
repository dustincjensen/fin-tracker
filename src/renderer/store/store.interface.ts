import { IAccountStore } from './account/account.store.interface';
import { IAutoCategoryStore } from './auto-category/auto-category.store.interface';
import { ICategoryStore } from './category/category.store.interface';
import { IInvestmentRecordStore } from './investment-record/investment-record.store.interface';
import { IPendingRecordStore } from './pending-record/pending-record.store.interface';
import { IRecordStore } from './record/record.store.interface';
import { IThirdPartyApiStore } from './third-party-api/third-party-api.store.interface';

export interface IStore {
  accounts: IAccountStore;
  autoCategories: IAutoCategoryStore;
  categories: ICategoryStore;
  investmentRecords: IInvestmentRecordStore;
  pendingRecords: IPendingRecordStore;
  records: IRecordStore;
  thirdPartyApi: IThirdPartyApiStore;
}

/**
 * The store interface for what data should be persisted.
 */
export interface IPersistedStore {
  accounts: IAccountStore;
  autoCategories: IAutoCategoryStore;
  categories: ICategoryStore;
  investmentRecords: IInvestmentRecordStore;
  records: IRecordStore;
  thirdPartyApi: IThirdPartyApiStore;
}
