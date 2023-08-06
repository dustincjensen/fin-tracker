import { AccountStore } from './account/account-slice';
import { IAutoCategoryStore } from './auto-category/auto-category.store.interface';
import { ICategoryStore } from './category/category.store.interface';
import { IInvestmentRecordStore } from './investment-record/investment-record.store.interface';
import { IPendingRecordStore } from './pending-record/pending-record.store.interface';
import { IRecordStore } from './record/record.store.interface';
import { ThirdPartyApiStore } from './third-party-api/third-party-api-slice';

export interface IStore {
    accounts: AccountStore;
    autoCategories: IAutoCategoryStore;
    categories: ICategoryStore;
    investmentRecords: IInvestmentRecordStore;
    pendingRecords: IPendingRecordStore;
    records: IRecordStore;
    thirdPartyApi: ThirdPartyApiStore;
}

/**
 * The store interface for what data should be persisted.
 */
export interface IPersistedStore {
    accounts: AccountStore;
    autoCategories: IAutoCategoryStore;
    categories: ICategoryStore;
    investmentRecords: IInvestmentRecordStore;
    records: IRecordStore;
    thirdPartyApi: ThirdPartyApiStore;
}
