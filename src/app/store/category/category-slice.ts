import { createSlice } from '@reduxjs/toolkit';
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/account.type';
import { Category } from '../../models/category.type';
import { newGuid } from '../../utils/guid.utils';
import { deleteAccount, saveNewAccount } from '../account/account-slice';

export type CategoryStore = {
    /**
     * The categories to assign to records.
     */
    categories: { [id: string]: Category };
};

const initialState: CategoryStore = { categories: {} };

const createTransferCategory = (state: Draft<CategoryStore>, { payload: newAccount }: PayloadAction<Account>) => {
    const newCategory: Category = {
        id: newGuid(),
        name: `${newAccount.name} Transfer`,
        color: '#000',
        accountTransferId: newAccount.id,
    };
    state.categories[newCategory.id] = newCategory;
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        saveNewCategory: (state, { payload: newCategory }: PayloadAction<Category>) => {
            state.categories[newCategory.id] = newCategory;
        },
        updateCategory: (state, { payload: updatedCategory }: PayloadAction<Category>) => {
            const { id } = updatedCategory;
            if (!state.categories[id]) {
                throw Error('Category does not exist.');
            }
            state.categories[id] = updatedCategory;
        },
        deleteCategory: (state, { payload: deletedCategory }: PayloadAction<Category>) => {
            delete state.categories[deletedCategory.id];
        },
        addTransferCategory: createTransferCategory,
    },
    extraReducers: builder => {
        builder.addCase(saveNewAccount, createTransferCategory);
        builder.addCase(deleteAccount, (state, { payload: account }: PayloadAction<Account>) => {
            const category = Object.keys(state.categories)
                .map(id => state.categories[id])
                .find(c => c.accountTransferId === account.id);

            if (category) {
                delete state.categories[category.id];
            }
        });
    },
});

export const { saveNewCategory, updateCategory, deleteCategory, addTransferCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
