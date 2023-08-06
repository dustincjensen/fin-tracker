import { Draft } from 'immer';
import { AccountActions } from '../account/account.actions';
import { IAccount } from '../account/account.interface';
import { CategoryActions } from '../category/category.actions';
import { ICategory } from '../category/category.interface';
import { createReducer } from '../create-reducer';
import { RecordActions } from '../record/record.actions';
import { AutoCategoryActions } from './auto-category.actions';
import { IAutoCategory } from './auto-category.interface';
import { IAutoCategoryStore } from './auto-category.store.interface';

const initialState: IAutoCategoryStore = { autoCategories: {} };

export const AutoCategoryReducer = createReducer(
    {
        [RecordActions.SET_RECORD_AUTO_CATEGORY]: saveRecordAutoCategory,
        [AutoCategoryActions.DELETE_AUTO_CATEGORY]: deleteAutoCategory,
        [CategoryActions.DELETE_CATEGORY]: deleteCategory,
        [AccountActions.DELETE_ACCOUNT]: deleteAccount,
    },
    initialState
);

function saveRecordAutoCategory(
    draft: Draft<IAutoCategoryStore>,
    payload: {
        accountId: string;
        autoCategoryId: string;
        categoryId: string;
        description: string;
        overwriteExisting: boolean;
    }
) {
    const { autoCategoryId, accountId, categoryId, description } = payload;
    const autoCategoriesForAccount: IAutoCategory[] = draft.autoCategories[accountId];

    const newRecord: IAutoCategory = {
        id: autoCategoryId,
        accountId,
        categoryId,
        description,
    };

    if (!autoCategoriesForAccount) {
        draft.autoCategories[accountId] = [newRecord];
    } else {
        draft.autoCategories[accountId].push(newRecord);
    }
}

function deleteAutoCategory(draft: Draft<IAutoCategoryStore>, autoCategory: IAutoCategory) {
    const { id, accountId } = autoCategory;
    const autoCategories = draft.autoCategories[accountId];
    const index = autoCategories.findIndex(ac => ac.id === id);

    if (index < 0) {
        throw Error(`Automatic category with id [${id}] does not exist.`);
    }

    draft.autoCategories[accountId] = [...autoCategories.slice(0, index), ...autoCategories.slice(index + 1)];
}

function deleteCategory(draft: Draft<IAutoCategoryStore>, category: ICategory) {
    const { id } = category;
    for (const accountId of Object.keys(draft.autoCategories)) {
        const autoCategories = draft.autoCategories[accountId];
        const index = autoCategories.findIndex(ac => ac.categoryId === id);
        if (index >= 0) {
            draft.autoCategories[accountId] = [...autoCategories.slice(0, index), ...autoCategories.slice(index + 1)];
        }
    }
}

function deleteAccount(draft: Draft<IAutoCategoryStore>, account: IAccount) {
    const { id } = account;
    delete draft.autoCategories[id];

    // TODO if you delete an account that the transfer account category is in use for an auto category
    // then it will end up being abandoned in the auto category list.
}
