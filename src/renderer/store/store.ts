import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { CategoryReducer } from './category/category.reducer';
import { PendingRecordReducer } from './pending-record/pending-record.reducer';
import { RecordReducer } from './record/record.reducer';

export const rootReducer = combineReducers({
  accounts: AccountReducer,
  categories: CategoryReducer,
  pendingRecords: PendingRecordReducer,
  records: RecordReducer,
});
