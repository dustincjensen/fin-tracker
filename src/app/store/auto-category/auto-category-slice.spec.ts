import { Account } from '../../models/account.type';
import { AutoCategory } from '../../models/auto-category.type';
import { Category } from '../../models/category.type';
import { build } from '../../utils/test.utils';
import { deleteAccount } from '../account/account-slice';
import { deleteCategory } from '../category/category-slice';
import { setRecordsAutoCategory } from '../record/record-slice';
import { AutoCategoryStore, autoCategoryReducer, deleteAutoCategory } from './auto-category-slice';

describe('Auto Category slice', () => {
    const accountId = 'accountId';
    const autoCategoryId = 'autoCategoryId';
    const categoryId = 'categoryId';
    const description = 'description';
    const otherAccountId = 'otherAccountId';
    const otherAutoCategoryId = 'otherAutoCategoryId';
    const otherCategoryId = 'otherCategoryId';
    const otherDescription = 'otherDescription';

    describe('deleteAutoCategory', () => {
        it('should throw an error when the auto category does not exist', () => {
            expect(() => {
                autoCategoryReducer(
                    {
                        autoCategories: {
                            [accountId]: [],
                        },
                    },
                    deleteAutoCategory(
                        build<AutoCategory>({
                            id: autoCategoryId,
                            accountId,
                        })
                    )
                );
            }).toThrowError(`Automatic category with id [autoCategoryId] does not exist.`);
        });

        it('should delete auto category for account', () => {
            const autoCategoryToDelete = build<AutoCategory>({
                id: autoCategoryId,
                accountId,
            });
            const autoCategorySave = build<AutoCategory>({
                id: otherAutoCategoryId,
                accountId,
            });

            const newState = autoCategoryReducer(
                {
                    autoCategories: {
                        [accountId]: [autoCategoryToDelete, autoCategorySave],
                    },
                },
                deleteAutoCategory(autoCategoryToDelete)
            );

            expect(newState).toEqual(
                build<AutoCategoryStore>({
                    autoCategories: {
                        [accountId]: [autoCategorySave],
                    },
                })
            );
        });
    });

    describe('extraReducers', () => {
        describe('setRecordAutoCategory', () => {
            it('should add account key and auto category', () => {
                const newState = autoCategoryReducer(
                    {
                        autoCategories: {},
                    },
                    setRecordsAutoCategory({
                        accountId,
                        autoCategoryId,
                        categoryId,
                        description,
                        overwriteExisting: false,
                    })
                );

                expect(newState).toEqual(
                    build<AutoCategoryStore>({
                        autoCategories: {
                            [accountId]: [
                                build<AutoCategory>({
                                    id: autoCategoryId,
                                    accountId,
                                    categoryId,
                                    description,
                                }),
                            ],
                        },
                    })
                );
            });

            it('should add auto category to existing account', () => {
                const autoCategory = build<AutoCategory>({
                    id: autoCategoryId,
                    accountId,
                    categoryId,
                    description,
                });

                const newState = autoCategoryReducer(
                    {
                        autoCategories: {
                            [accountId]: [autoCategory],
                        },
                    },
                    setRecordsAutoCategory({
                        accountId,
                        autoCategoryId: otherAutoCategoryId,
                        categoryId: otherCategoryId,
                        description: otherDescription,
                        overwriteExisting: false,
                    })
                );

                expect(newState).toEqual(
                    build<AutoCategoryStore>({
                        autoCategories: {
                            [accountId]: [
                                autoCategory,
                                build<AutoCategory>({
                                    id: otherAutoCategoryId,
                                    accountId,
                                    categoryId: otherCategoryId,
                                    description: otherDescription,
                                }),
                            ],
                        },
                    })
                );
            });
        });

        describe('deleteCategory', () => {
            it('should delete all auto categories for that match the category', () => {
                const account1Auto1 = build<AutoCategory>({
                    id: autoCategoryId,
                    categoryId,
                    accountId,
                });
                const account1Auto2 = build<AutoCategory>({
                    id: autoCategoryId,
                    categoryId: otherCategoryId,
                    accountId,
                });
                const account2Auto1 = build<AutoCategory>({
                    id: otherAutoCategoryId,
                    categoryId,
                    accountId: otherAccountId,
                });

                const newState = autoCategoryReducer(
                    {
                        autoCategories: {
                            [accountId]: [account1Auto1, account1Auto2],
                            [otherAccountId]: [account2Auto1],
                        },
                    },
                    deleteCategory(build<Category>({ id: categoryId }))
                );

                expect(newState).toEqual(
                    build<AutoCategoryStore>({
                        autoCategories: {
                            [accountId]: [account1Auto2],
                            [otherAccountId]: [],
                        },
                    })
                );
            });
        });

        describe('deleteAccount', () => {
            it('should delete all auto categories for account', () => {
                const account1Auto1 = build<AutoCategory>({
                    id: autoCategoryId,
                    accountId,
                });
                const account2Auto1 = build<AutoCategory>({
                    id: otherAutoCategoryId,
                    accountId: otherAccountId,
                });

                const newState = autoCategoryReducer(
                    {
                        autoCategories: {
                            [accountId]: [account1Auto1],
                            [otherAccountId]: [account2Auto1],
                        },
                    },
                    deleteAccount(build<Account>({ id: accountId }))
                );

                expect(newState).toEqual(
                    build<AutoCategoryStore>({
                        autoCategories: {
                            [otherAccountId]: [account2Auto1],
                        },
                    })
                );
            });
        });
    });
});
