import { combineReducers } from 'redux';
import { accountReducer } from './account/account-slice';
import { autoCategoryReducer } from './auto-category/auto-category-slice';
import { categoryReducer } from './category/category-slice';
import { investmentRecordReducer } from './investment-record/investment-record-slice';
import { pendingRecordReducer } from './pending-record/pending-record-slice';
import { recordReducer } from './record/record-slice';
import { IStore } from './store.interface';
import { thirdPartyApiReducer } from './third-party-api/third-party-api-slice';

// TODO fixing typing...
export const rootReducer = combineReducers<IStore>({
    accounts: accountReducer,
    autoCategories: autoCategoryReducer,
    categories: categoryReducer,
    investmentRecords: investmentRecordReducer,
    pendingRecords: pendingRecordReducer,
    records: recordReducer,
    thirdPartyApi: thirdPartyApiReducer,
});
