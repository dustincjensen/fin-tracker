import { combineReducers } from 'redux';
import { NewFileReducer } from './new-file/new-file.reducer';

const rootReducer = combineReducers({
  newFile: NewFileReducer
});

export default rootReducer;
