import { AccountStore } from './account/account-slice';
import { AutoCategoryStore } from './auto-category/auto-category-slice';
import { CategoryStore } from './category/category-slice';
import { InvestmentRecordStore } from './investment-record/investment-record-slice';
import { PendingRecordStore } from './pending-record/pending-record-slice';
import { RecordStore } from './record/record-slice';
import { ThirdPartyApiStore } from './third-party-api/third-party-api-slice';

export interface IStore {
    accounts: AccountStore;
    autoCategories: AutoCategoryStore;
    categories: CategoryStore;
    investmentRecords: InvestmentRecordStore;
    pendingRecords: PendingRecordStore;
    records: RecordStore;
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
    records: RecordStore;
    thirdPartyApi: ThirdPartyApiStore;
}
