import { AccountActions } from './account.actions';
import { IAccount } from './account.interface';
import { AccountReducer as reducer } from './account.reducer';
import { IAccountStore } from './account.store.interface';

describe('reducers', () => {
    describe('Account', () => {
        const accountId = 'accountId';
        const otherAccountId = 'otherAccountId';
        const account: IAccount = {
            id: accountId,
            accountType: 'Chequing',
            name: 'Chequing',
            startMonth: 4,
            startYear: 2020,
            startingBalance: 1234.12,
        };
        const otherAccount: IAccount = {
            id: otherAccountId,
            accountType: 'Savings',
            name: 'Savings',
            startMonth: 7,
            startYear: 2017,
            startingBalance: 4321.12,
        };

        describe('saveNewAccount', () => {
            it('should add a new account', () => {
                const initialState: IAccountStore = {
                    accounts: {},
                };

                const newState = reducer(initialState, {
                    type: AccountActions.SAVE_NEW_ACCOUNT,
                    payload: account,
                });

                const expectedState: IAccountStore = {
                    accounts: {
                        [accountId]: account,
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('updateAccount', () => {
            it('should throw an error when account does not exist', () => {
                const initialState: IAccountStore = {
                    accounts: {},
                };

                expect(() => {
                    reducer(initialState, {
                        type: AccountActions.UPDATE_ACCOUNT,
                        payload: account,
                    });
                }).toThrowError('Account does not exist');
            });

            it('should update account when account exists', () => {
                const initialState: IAccountStore = {
                    accounts: {
                        [accountId]: account,
                        [otherAccountId]: otherAccount,
                    },
                };

                const newState = reducer(initialState, {
                    type: AccountActions.UPDATE_ACCOUNT,
                    payload: { ...account, endMonth: 11, endYear: 2021 },
                });

                const expectedState: IAccountStore = {
                    accounts: {
                        [accountId]: { ...account, endMonth: 11, endYear: 2021 },
                        [otherAccountId]: otherAccount,
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('deleteAccount', () => {
            it('should delete the account when it exists', () => {
                const initialState: IAccountStore = {
                    accounts: {
                        [accountId]: account,
                        [otherAccountId]: otherAccount,
                    },
                };

                const newState = reducer(initialState, {
                    type: AccountActions.DELETE_ACCOUNT,
                    payload: account,
                });

                const expectedState: IAccountStore = {
                    accounts: {
                        [otherAccountId]: otherAccount,
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });

        describe('archiveAccount', () => {
            it('should set account as archived', () => {
                const initialState: IAccountStore = {
                    accounts: {
                        [accountId]: account,
                    },
                };

                const newState = reducer(initialState, {
                    type: AccountActions.ARCHIVE_ACCOUNT,
                    payload: { id: accountId, archived: true, endYear: 2020, endMonth: 11 },
                });

                const expectedState: IAccountStore = {
                    accounts: {
                        [accountId]: {
                            ...account,
                            archived: true,
                            endYear: 2020,
                            endMonth: 11,
                        },
                    },
                };
                expect(newState).toEqual(expectedState);
            });
        });
    });
});
