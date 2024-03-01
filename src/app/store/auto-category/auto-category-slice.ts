import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/account.type';
import { AutoCategory } from '../../models/auto-category.type';
import { Category } from '../../models/category.type';
import { deleteAccount } from '../account/account-slice';
import { deleteCategory } from '../category/category-slice';
import { setRecordsAutoCategory } from '../record/record-slice';

export type AutoCategoryStore = {
    /**
     * The auto categories that are available to be assigned to records.
     * Keyed by accountId.
     */
    autoCategories: Record<string, AutoCategory[]>;
};

const initialState: AutoCategoryStore = { autoCategories: {} };

export const autoCategorySlice = createSlice({
    name: 'autoCategories',
    initialState,
    reducers: {
        deleteAutoCategory: (state, { payload: autoCategory }: PayloadAction<AutoCategory>) => {
            const { id, accountId } = autoCategory;
            const autoCategories = state.autoCategories[accountId];
            const index = autoCategories.findIndex(ac => ac.id === id);

            if (index < 0) {
                throw Error(`Automatic category with id [${id}] does not exist.`);
            }

            state.autoCategories[accountId] = [...autoCategories.slice(0, index), ...autoCategories.slice(index + 1)];
        },
    },
    extraReducers: builder => {
        builder.addCase(
            // TODO replace this with record action when it is created
            // Or make this an "auto category" reducer and move the extra case to the records extra section
            setRecordsAutoCategory,
            (
                state,
                {
                    payload,
                }: PayloadAction<{
                    accountId: string;
                    autoCategoryId: string;
                    categoryId: string;
                    description: string;
                    overwriteExisting: boolean;
                }>
            ) => {
                const { autoCategoryId, accountId, categoryId, description } = payload;
                const autoCategoriesForAccount: AutoCategory[] = state.autoCategories[accountId];

                const newRecord: AutoCategory = {
                    id: autoCategoryId,
                    accountId,
                    categoryId,
                    description,
                };

                if (!autoCategoriesForAccount) {
                    state.autoCategories[accountId] = [newRecord];
                } else {
                    state.autoCategories[accountId].push(newRecord);
                }
            }
        );

        builder.addCase(deleteCategory, (state, { payload: category }: PayloadAction<Category>) => {
            const { id } = category;
            for (const accountId of Object.keys(state.autoCategories)) {
                state.autoCategories[accountId] = state.autoCategories[accountId].filter(ac => ac.categoryId !== id);
            }
        });

        builder.addCase(deleteAccount, (state, { payload: account }: PayloadAction<Account>) => {
            const { id } = account;
            delete state.autoCategories[id];

            // TODO if you delete an account that the transfer account category is in use for an auto category
            // then it will end up being abandoned in the auto category list.
        });
    },
});

export const { deleteAutoCategory } = autoCategorySlice.actions;

export const autoCategoryReducer = autoCategorySlice.reducer;
