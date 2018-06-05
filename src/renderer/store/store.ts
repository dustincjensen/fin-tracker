import { combineReducers } from 'redux';
import { AccountReducer } from './account/account.reducer';
import { NewFileReducer } from './new-file/new-file.reducer';

const rootReducer = combineReducers({
  accounts: AccountReducer,
  newFile: NewFileReducer
});

export default rootReducer;
