import { Draft } from 'immer';
import { Account } from '../../models/account.type';
import { newGuid } from '../../utils/guid.utils';
import { saveNewAccount, deleteAccount } from '../account/account-slice';
import { createReducer } from '../create-reducer';
import { CategoryActions } from './category.actions';
import { ICategory } from './category.interface';
import { ICategoryStore } from './category.store.interface';

const initialState: ICategoryStore = { categories: {} };

export const CategoryReducer = createReducer(
    {
        [CategoryActions.SAVE_NEW_CATEGORY]: saveNewCategory,
        [CategoryActions.UPDATE_CATEGORY]: updateCategory,
        [CategoryActions.DELETE_CATEGORY]: deleteCategory,
        [saveNewAccount.type]: createTransferCategory,
        [CategoryActions.ADD_TRANSFER_CATEGORY]: createTransferCategory,
        [deleteAccount.type]: deleteTransferCategory,
    },
    initialState
);

function saveNewCategory(draft: Draft<ICategoryStore>, newCategory: ICategory) {
    const { id } = newCategory;
    draft.categories[id] = newCategory;
}

function updateCategory(draft: Draft<ICategoryStore>, updatedCategory: ICategory) {
    const { id } = updatedCategory;
    if (!draft.categories[id]) {
        throw Error('Category does not exist.');
    }
    draft.categories[id] = updatedCategory;
}

function deleteCategory(draft: Draft<ICategoryStore>, deletedCategory: ICategory) {
    delete draft.categories[deletedCategory.id];
}

function createTransferCategory(draft: Draft<ICategoryStore>, newAccount: Account) {
    const newCategory: ICategory = {
        id: newGuid(),
        name: `${newAccount.name} Transfer`,
        color: '#000',
        accountTransferId: newAccount.id,
    };
    draft.categories[newCategory.id] = newCategory;
}

function deleteTransferCategory(draft: Draft<ICategoryStore>, account: Account) {
    const category = Object.keys(draft.categories)
        .map(id => draft.categories[id])
        .find(c => c.accountTransferId === account.id);

    if (category) {
        delete draft.categories[category.id];
    }
}
