import { AccountStore } from './account/account-slice';
import { AutoCategoryStore } from './auto-category/auto-category-slice';
import { CategoryStore } from './category/category-slice';
import { InvestmentRecordStore } from './investment-record/investment-record-slice';
import { IPendingRecordStore } from './pending-record/pending-record.store.interface';
import { IRecordStore } from './record/record.store.interface';
import { ThirdPartyApiStore } from './third-party-api/third-party-api-slice';

export interface IStore {
    accounts: AccountStore;
    autoCategories: AutoCategoryStore;
    categories: CategoryStore;
    investmentRecords: InvestmentRecordStore;
    pendingRecords: IPendingRecordStore;
    records: IRecordStore;
    thirdPartyApi: ThirdPartyApiStore;
}

/**
 * The store interface for what data should be persisted.
 */
export interface IPersistedStore {
    accounts: AccountStore;
    autoCategories: AutoCategoryStore;
    categories: CategoryStore;
    investmentRecords: InvestmentRecordStore;
    records: IRecordStore;
    thirdPartyApi: ThirdPartyApiStore;
}
