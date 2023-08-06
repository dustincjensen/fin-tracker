import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { AutoCategoryReducer } from './auto-category/auto-category.reducer';
import { CategoryReducer } from './category/category.reducer';
import { InvestmentRecordReducer } from './investment-record/investment-record.reducer';
import { PendingRecordReducer } from './pending-record/pending-record.reducer';
import { RecordReducer } from './record/record.reducer';
import { IStore } from './store.interface';
import { ThirdPartyApiReducer } from './third-party-api/third-party-api.reducer';

// TODO fixing typing...
export const rootReducer = combineReducers<IStore>({
  accounts: AccountReducer,
  autoCategories: AutoCategoryReducer,
  categories: CategoryReducer,
  investmentRecords: InvestmentRecordReducer,
  pendingRecords: PendingRecordReducer,
  records: RecordReducer,
  thirdPartyApi: ThirdPartyApiReducer,
});
