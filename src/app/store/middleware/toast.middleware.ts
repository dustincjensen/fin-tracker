import { toaster } from 'evergreen-ui';
import { saveNewAccount, updateAccount, deleteAccount } from '../account/account-slice';
import { saveNewCategory, updateCategory, deleteCategory } from '../category/category-slice';
import { saveNewRecords } from '../record/record-slice';

const toastActions = {
    [saveNewRecords.type]: () => toaster.success('Records updated'),

    [saveNewAccount.type]: action => toaster.success(`'${action.payload.name}' account created`),
    [updateAccount.type]: action => toaster.success(`'${action.payload.name}' account updated`),
    [deleteAccount.type]: action => toaster.danger(`'${action.payload.name}' account deleted`),

    [saveNewCategory.type]: action => toaster.success(`'${action.payload.name}' category created`),
    [updateCategory.type]: action => toaster.success(`'${action.payload.name}' category updated`),
    [deleteCategory.type]: action => toaster.danger(`'${action.payload.name}' category deleted`),
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
