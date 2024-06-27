import { Account } from '../../models/account.type';
import { Category } from '../../models/category.type';
import * as guidUtils from '../../utils/guid.utils';
import { build } from '../../utils/test.utils';
import { deleteAccount, saveNewAccount } from '../account/account-slice';
import {
    CategoryStore,
    categoryReducer,
    addTransferCategory,
    deleteCategory,
    saveNewCategory,
    updateCategory,
} from './category-slice';

describe('Category slice', () => {
    const categoryId = 'categoryId';
    const otherCategoryId = 'otherCategoryId';
    const category: Category = {
        id: categoryId,
        name: 'Grocery',
        color: '#123456',
    };
    const otherCategory: Category = {
        id: otherCategoryId,
        name: 'Eating Out',
        color: '#654321',
    };

    describe('saveNewCategory', () => {
        it('should add a new category', () => {
            const newState = categoryReducer(
                {
                    categories: {},
                },
                saveNewCategory(category)
            );

            expect(newState).toEqual(build<CategoryStore>({ categories: { [categoryId]: category } }));
        });
    });

    describe('updateCategory', () => {
        it('should throw an error when category does not exist', () => {
            expect(() => {
                categoryReducer(
                    {
                        categories: {},
                    },
                    updateCategory(category)
                );
            }).toThrowError('Category does not exist');
        });

        it('should update category when category exists', () => {
            const newState = categoryReducer(
                {
                    categories: {
                        [categoryId]: category,
                        [otherCategoryId]: otherCategory,
                    },
                },
                updateCategory({
                    ...category,
                    color: '#ff5566',
                })
            );

            expect(newState).toEqual(
                build<CategoryStore>({
                    categories: {
                        [categoryId]: { ...category, color: '#ff5566' },
                        [otherCategoryId]: otherCategory,
                    },
                })
            );
        });
    });

    describe('deleteCategory', () => {
        it('should delete the category when it exists', () => {
            const newState = categoryReducer(
                {
                    categories: {
                        [categoryId]: category,
                        [otherCategoryId]: otherCategory,
                    },
                },
                deleteCategory(category)
            );

            expect(newState).toEqual(
                build<CategoryStore>({
                    categories: {
                        [otherCategoryId]: otherCategory,
                    },
                })
            );
        });
    });

    describe('addTransferCategory', () => {
        it('should create new transfer category when called', () => {
            jest.spyOn(guidUtils, 'newGuid').mockReturnValue('newGuid');

            const newState = categoryReducer(
                {
                    categories: {},
                },
                addTransferCategory(build<Account>({ id: 'accountId', name: 'accountName' }))
            );

            expect(newState).toEqual(
                build<CategoryStore>({
                    categories: {
                        newGuid: {
                            id: 'newGuid',
                            name: 'accountName Transfer',
                            color: '#000',
                            accountTransferId: 'accountId',
                        },
                    },
                })
            );
        });
    });

    describe('extraReducers', () => {
        describe('saveNewAccount', () => {
            it('should create a transfer category when saving a new account', () => {
                jest.spyOn(guidUtils, 'newGuid').mockReturnValue('newGuid');

                const newState = categoryReducer(
                    {
                        categories: {},
                    },
                    saveNewAccount(build<Account>({ id: 'accountId', name: 'accountName' }))
                );

                expect(newState).toEqual(
                    build<CategoryStore>({
                        categories: {
                            newGuid: {
                                id: 'newGuid',
                                name: 'accountName Transfer',
                                color: '#000',
                                accountTransferId: 'accountId',
                            },
                        },
                    })
                );
            });
        });

        describe('deleteAccount', () => {
            it('should delete transfer category when deleting an account', () => {
                const newState = categoryReducer(
                    {
                        categories: {
                            transferCategoryId: {
                                id: 'transferCategoryId',
                                name: 'accountName Transfer',
                                color: '#000',
                                accountTransferId: 'accountId',
                            },
                        },
                    },
                    deleteAccount(build<Account>({ id: 'accountId', name: 'accountName' }))
                );

                expect(newState).toEqual(build<CategoryStore>({ categories: {} }));
            });

            it('should not delete category when there is no account transfer id that matches', () => {
                const newState = categoryReducer(
                    {
                        categories: {
                            categoryId: {
                                id: 'categoryId',
                                name: 'Eating Out',
                                color: '#000',
                                accountTransferId: undefined,
                            },
                        },
                    },
                    deleteAccount(build<Account>({ id: 'accountId', name: 'accountName' }))
                );

                expect(newState).toEqual(
                    build<CategoryStore>({
                        categories: {
                            categoryId: {
                                id: 'categoryId',
                                name: 'Eating Out',
                                color: '#000',
                                accountTransferId: undefined,
                            },
                        },
                    })
                );
            });
        });
    });
});
