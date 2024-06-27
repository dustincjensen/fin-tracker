import { Account } from '../../models/account.type';
import { build } from '../../utils/test.utils';
import {
    accountReducer,
    archiveAccount,
    deleteAccount,
    saveNewAccount,
    updateAccount,
    AccountStore,
} from './account-slice';

describe('Account slice', () => {
    const accountId = 'accountId';
    const otherAccountId = 'otherAccountId';
    const account: Account = {
        id: accountId,
        accountType: 'Chequing',
        name: 'Chequing',
        startMonth: 4,
        startYear: 2020,
        startingBalance: 1234.12,
    };
    const otherAccount: Account = {
        id: otherAccountId,
        accountType: 'Savings',
        name: 'Savings',
        startMonth: 7,
        startYear: 2017,
        startingBalance: 4321.12,
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(accountReducer(undefined, { type: undefined })).toEqual(
                build<AccountStore>({
                    accounts: {},
                })
            );
        });
    });

    describe('saveNewAccount', () => {
        it('should add a new account', () => {
            const newState = accountReducer({ accounts: {} }, saveNewAccount(account));
            expect(newState).toEqual(
                build<AccountStore>({
                    accounts: { [accountId]: account },
                })
            );
        });
    });

    describe('updateAccount', () => {
        it('should throw an error when account does not exist', () => {
            expect(() => {
                accountReducer(
                    {
                        accounts: {},
                    },
                    updateAccount(account)
                );
            }).toThrowError('Account does not exist');
        });

        it('should update account when account exists', () => {
            const newState = accountReducer(
                {
                    accounts: {
                        [accountId]: account,
                        [otherAccountId]: otherAccount,
                    },
                },
                updateAccount({ ...account, endMonth: 11, endYear: 2021 })
            );

            expect(newState).toEqual(
                build<AccountStore>({
                    accounts: {
                        [accountId]: { ...account, endMonth: 11, endYear: 2021 },
                        [otherAccountId]: otherAccount,
                    },
                })
            );
        });
    });

    describe('deleteAccount', () => {
        it('should delete the account when it exists', () => {
            const newState = accountReducer(
                {
                    accounts: {
                        [accountId]: account,
                        [otherAccountId]: otherAccount,
                    },
                },
                deleteAccount(account)
            );

            expect(newState).toEqual(
                build<AccountStore>({
                    accounts: {
                        [otherAccountId]: otherAccount,
                    },
                })
            );
        });
    });

    describe('archiveAccount', () => {
        it('should set account as archived', () => {
            const newState = accountReducer(
                {
                    accounts: {
                        [accountId]: account,
                    },
                },
                archiveAccount({ id: accountId, archived: true, endYear: 2020, endMonth: 11 })
            );

            expect(newState).toEqual(
                build<AccountStore>({
                    accounts: {
                        [accountId]: {
                            ...account,
                            archived: true,
                            endYear: 2020,
                            endMonth: 11,
                        },
                    },
                })
            );
        });
    });
});
