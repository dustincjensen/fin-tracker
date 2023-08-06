import { build } from '../../utils/test.utils';
import { AccountActions } from '../account/account.actions';
import { IAccount } from '../account/account.interface';
import { CategoryActions } from '../category/category.actions';
import { ICategory } from '../category/category.interface';
import { RecordActions } from '../record/record.actions';
import { AutoCategoryActions } from './auto-category.actions';
import { IAutoCategory } from './auto-category.interface';
import { AutoCategoryReducer as reducer } from './auto-category.reducer';
import { IAutoCategoryStore } from './auto-category.store.interface';

describe('reducers', () => {
    describe('AutoCategory', () => {
        const accountId = 'accountId';
        const autoCategoryId = 'autoCategoryId';
        const categoryId = 'categoryId';
        const description = 'description';
        const otherAccountId = 'otherAccountId';
        const otherAutoCategoryId = 'otherAutoCategoryId';
        const otherCategoryId = 'otherCategoryId';
        const otherDescription = 'otherDescription';

        describe('saveRecordAutoCategory', () => {
            it('should add account key and auto category', () => {
                const initialState: IAutoCategoryStore = {
                    autoCategories: {},
                };

                const newState = reducer(initialState, {
                    type: RecordActions.SET_RECORD_AUTO_CATEGORY,
                    payload: {
                        accountId,
                        autoCategoryId,
                        categoryId,
                        description,
                    },
                });

                const expectedState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [
                            build<IAutoCategory>({
                                id: autoCategoryId,
                                accountId,
                                categoryId,
                                description,
                            }),
                        ],
                    },
                };
                expect(newState).toEqual(expectedState);
            });

            it('should add auto category to existing account', () => {
                const autoCategory = build<IAutoCategory>({
                    id: autoCategoryId,
                    accountId,
                    categoryId,
                    description,
                });

                const initialState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [autoCategory],
                    },
                };

                const newState = reducer(initialState, {
                    type: RecordActions.SET_RECORD_AUTO_CATEGORY,
                    payload: {
                        accountId,
                        autoCategoryId: otherAutoCategoryId,
                        categoryId: otherCategoryId,
                        description: otherDescription,
                    },
                });

                const expectedState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [
                            autoCategory,
                            build<IAutoCategory>({
                                id: otherAutoCategoryId,
                                accountId,
                                categoryId: otherCategoryId,
                                description: otherDescription,
                            }),
                        ],
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('deleteAutoCategory', () => {
            it('should throw an error when the auto category does not exist', () => {
                const initialState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [],
                    },
                };

                expect(() => {
                    reducer(initialState, {
                        type: AutoCategoryActions.DELETE_AUTO_CATEGORY,
                        payload: build<IAutoCategory>({
                            id: autoCategoryId,
                            accountId,
                        }),
                    });
                }).toThrowError(`Automatic category with id [autoCategoryId] does not exist.`);
            });

            it('should delete auto category for account', () => {
                const autoCategoryToDelete = build<IAutoCategory>({
                    id: autoCategoryId,
                    accountId,
                });
                const autoCategorySave = build<IAutoCategory>({
                    id: otherAutoCategoryId,
                    accountId,
                });
                const initialState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [autoCategoryToDelete, autoCategorySave],
                    },
                };

                const newState = reducer(initialState, {
                    type: AutoCategoryActions.DELETE_AUTO_CATEGORY,
                    payload: autoCategoryToDelete,
                });

                const expectedState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [autoCategorySave],
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('deleteCategory', () => {
            it('should delete all auto categories for that match the category', () => {
                const account1Auto1 = build<IAutoCategory>({
                    id: autoCategoryId,
                    categoryId,
                    accountId,
                });
                const account1Auto2 = build<IAutoCategory>({
                    id: autoCategoryId,
                    categoryId: otherCategoryId,
                    accountId,
                });
                const account2Auto1 = build<IAutoCategory>({
                    id: otherAutoCategoryId,
                    categoryId,
                    accountId: otherAccountId,
                });

                const initialState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [account1Auto1, account1Auto2],
                        [otherAccountId]: [account2Auto1],
                    },
                };

                const newState = reducer(initialState, {
                    type: CategoryActions.DELETE_CATEGORY,
                    payload: build<ICategory>({ id: categoryId }),
                });

                const expectedState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [account1Auto2],
                        [otherAccountId]: [],
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('deleteAccount', () => {
            it('should delete all auto categories for account', () => {
                const account1Auto1 = build<IAutoCategory>({
                    id: autoCategoryId,
                    accountId,
                });
                const account2Auto1 = build<IAutoCategory>({
                    id: otherAutoCategoryId,
                    accountId: otherAccountId,
                });
                const initialState: IAutoCategoryStore = {
                    autoCategories: {
                        [accountId]: [account1Auto1],
                        [otherAccountId]: [account2Auto1],
                    },
                };

                const newState = reducer(initialState, {
                    type: AccountActions.DELETE_ACCOUNT,
                    payload: build<IAccount>({ id: accountId }),
                });

                const expectedState: IAutoCategoryStore = {
                    autoCategories: {
                        [otherAccountId]: [account2Auto1],
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });
    });
});
