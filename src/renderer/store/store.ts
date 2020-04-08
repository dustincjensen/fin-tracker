import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { AutoCategoryReducer } from './auto-category/auto-category.reducer';
import { CategoryReducer } from './category/category.reducer';
import { PendingRecordReducer } from './pending-record/pending-record.reducer';
import { RecordReducer } from './record/record.reducer';
import { IStore } from './store.interface';

export const rootReducer = combineReducers<IStore>({
  accounts: AccountReducer,
  categories: CategoryReducer,
  autoCategories: AutoCategoryReducer,
  pendingRecords: PendingRecordReducer,
  records: RecordReducer,
});
