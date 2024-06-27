import { Account } from '../../models/account.type';
import { InvestmentRecord } from '../../models/investment-record.type';
import { build } from '../../utils/test.utils';
import { deleteAccount } from '../account/account-slice';
import { addRecord, deleteRecord, investmentRecordReducer, InvestmentRecordStore } from './investment-record-slice';

describe('Investment Record slice', () => {
    const accountId = 'accountId';
    const otherAccountId = 'otherAccountId';

    describe('addRecord', () => {
        it('should create record for account id and add to array when account does not exist', () => {
            const record = build<InvestmentRecord>({
                id: 'record1',
                accountId,
            });

            const newState = investmentRecordReducer(
                {
                    records: {},
                },
                addRecord(record)
            );

            expect(newState).toEqual(
                build<InvestmentRecordStore>({
                    records: {
                        [accountId]: [record],
                    },
                })
            );
        });

        it('should add record to array by the account id', () => {
            const record = build<InvestmentRecord>({
                id: 'record1',
                accountId,
            });
            const otherRecord = build<InvestmentRecord>({
                id: 'record2',
                accountId: otherAccountId,
            });

            const newState = investmentRecordReducer(
                {
                    records: {
                        [otherAccountId]: [otherRecord],
                        [accountId]: [],
                    },
                },
                addRecord(record)
            );
            expect(newState).toEqual(
                build<InvestmentRecordStore>({
                    records: {
                        [otherAccountId]: [otherRecord],
                        [accountId]: [record],
                    },
                })
            );
        });
    });

    describe('deleteRecord', () => {
        it('should delete record from account', () => {
            const record = build<InvestmentRecord>({
                id: 'record1',
                accountId,
            });
            const newState = investmentRecordReducer(
                {
                    records: {
                        [accountId]: [record],
                    },
                },
                deleteRecord(record)
            );

            expect(newState).toEqual(
                build<InvestmentRecordStore>({
                    records: {
                        [accountId]: [],
                    },
                })
            );
        });
    });

    describe('extraReducers', () => {
        describe('deleteAccount', () => {
            it('should delete all records for an account when the account is deleted', () => {
                const record1 = build<InvestmentRecord>({
                    id: 'record1',
                    accountId,
                });
                const record2 = build<InvestmentRecord>({
                    id: 'record2',
                    accountId,
                });
                const record3 = build<InvestmentRecord>({
                    id: 'record3',
                    accountId: otherAccountId,
                });
                const newState = investmentRecordReducer(
                    {
                        records: {
                            [accountId]: [record1, record2],
                            [otherAccountId]: [record3],
                        },
                    },
                    deleteAccount(build<Account>({ id: accountId }))
                );

                expect(newState).toEqual(
                    build<InvestmentRecordStore>({
                        records: {
                            [otherAccountId]: [record3],
                        },
                    })
                );
            });
        });
    });
});
