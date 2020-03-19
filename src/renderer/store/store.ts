import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { CategoryReducer } from './category/category.reducer';
import { PendingRecordsReducer } from './pending-records/pending-records.reducer';
import { RecordsReducer } from './records/records.reducer';

export const rootReducer = combineReducers({
  accounts: AccountReducer,
  categories: CategoryReducer,
  pendingRecords: PendingRecordsReducer,
  records: RecordsReducer,
});
