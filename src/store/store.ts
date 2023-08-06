import { combineReducers } from 'redux';
import { accountReducer } from './account/account-slice';
import { AutoCategoryReducer } from './auto-category/auto-category.reducer';
import { categoryReducer } from './category/category-slice';
import { InvestmentRecordReducer } from './investment-record/investment-record.reducer';
import { PendingRecordReducer } from './pending-record/pending-record.reducer';
import { RecordReducer } from './record/record.reducer';
import { IStore } from './store.interface';
import { thirdPartyApiReducer } from './third-party-api/third-party-api-slice';

// TODO fixing typing...
export const rootReducer = combineReducers<IStore>({
    accounts: accountReducer,
    autoCategories: AutoCategoryReducer,
    categories: categoryReducer,
    investmentRecords: InvestmentRecordReducer,
    pendingRecords: PendingRecordReducer,
    records: RecordReducer,
    thirdPartyApi: thirdPartyApiReducer,
});
