import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { RecordsReducer } from './records/records.reducer';

const rootReducer = combineReducers({
  accounts: AccountReducer,
  records: RecordsReducer
});

export default rootReducer;
