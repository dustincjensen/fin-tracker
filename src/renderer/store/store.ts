import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { CategoryReducer } from './category/category.reducer';
import { RecordsReducer } from './records/records.reducer';

const rootReducer = combineReducers({
  accounts: AccountReducer,
  categories: CategoryReducer,
  records: RecordsReducer
});

export default rootReducer;
