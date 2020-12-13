import { toaster } from 'evergreen-ui';
import { AccountActions } from '../account/account.actions';
import { CategoryActions } from '../category/category.actions';
import { RecordActions } from '../record/record.actions';

const toastActions = {
  [RecordActions.SAVE_NEW_RECORDS]: () => toaster.success('Records updated'),

  [AccountActions.SAVE_NEW_ACCOUNT]: action => toaster.success(`'${action.payload.name}' account created`),
  [AccountActions.UPDATE_ACCOUNT]: action => toaster.success(`'${action.payload.name}' account updated`),
  [AccountActions.DELETE_ACCOUNT]: action => toaster.danger(`'${action.payload.name}' account deleted`),

  [CategoryActions.SAVE_NEW_CATEGORY]: action => toaster.success(`'${action.payload.name}' category created`),
  [CategoryActions.UPDATE_CATEGORY]: action => toaster.success(`'${action.payload.name}' category updated`),
  [CategoryActions.DELETE_CATEGORY]: action => toaster.danger(`'${action.payload.name}' category deleted`),
};

export const toastMiddleware = () => {
  return next => action => {
    const toast = toastActions[action.type];
    if (toast) {
      toast(action);
    }
    return next(action);
  };
};
