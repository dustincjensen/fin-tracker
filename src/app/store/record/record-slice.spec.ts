import { Account } from '../../models/account.type';
import { AutoCategory } from '../../models/auto-category.type';
import { Record } from '../../models/record.type';
import { SplitRecord } from '../../models/split-record.type';
import { build } from '../../utils/test.utils';
import { deleteAccount } from '../account/account-slice';
import { deleteAutoCategory } from '../auto-category/auto-category-slice';
import {
    deleteSplitRecords,
    recordReducer,
    RecordStore,
    saveNewRecords,
    setDetails,
    setRecordCategory,
    setRecordsAutoCategory,
    setSplitRecordCategory,
    setSplitRecords,
} from './record-slice';

describe('Record slice', () => {
    const recordId = 'recordId';
    const accountId = 'accountId';
    const categoryId = 'categoryId';
    const autoCategoryId = 'autoCategoryId';
    const otherAccountId = 'otherAccountId';

    describe('saveNewRecords', () => {
        it('should not add records when there are no records to add', () => {
            const newState = recordReducer({ records: {} }, saveNewRecords({ records: [] }));

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {},
                })
            );
        });

        it('should add records to the account', () => {
            const record = build<Record>({ id: recordId, accountId });

            const newState = recordReducer(
                { records: {} },
                saveNewRecords({
                    records: [record],
                })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [record],
                    },
                })
            );
        });
    });

    describe('setDetails', () => {
        it('should set the details of the record', () => {
            const record = build<Record>({ id: recordId, accountId });

            const newState = recordReducer(
                {
                    records: {
                        [accountId]: [record],
                    },
                },
                setDetails({
                    accountId,
                    recordId,
                    details: 'new details',
                })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [{ ...record, details: 'new details' }],
                    },
                })
            );
        });
    });

    describe('setRecordCategory', () => {
        it('should set the record category', () => {
            const record = build<Record>({ id: recordId, accountId, autoCategoryId: 'someValue' });

            const newState = recordReducer(
                {
                    records: {
                        [accountId]: [record],
                    },
                },
                setRecordCategory({ accountId, recordId, categoryId })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [{ ...record, categoryId, autoCategoryId: undefined }],
                    },
                })
            );
        });
    });

    describe('setRecordAutoCategory', () => {
        it('should set the record auto category', () => {
            const record1 = build<Record>({
                id: 'id1',
                accountId,
                description: 'SuperMarket',
            });
            const record2 = build<Record>({
                id: 'id2',
                accountId,
                description: 'ValueStore',
            });
            const record3 = build<Record>({
                id: 'id3',
                accountId: otherAccountId,
                description: 'SuperMarket',
            });

            const newState = recordReducer(
                {
                    records: {
                        [accountId]: [record1, record2],
                        [otherAccountId]: [record3],
                    },
                },
                setRecordsAutoCategory({
                    autoCategoryId,
                    accountId,
                    categoryId,
                    description: 'SuperMarket',
                    overwriteExisting: false,
                })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [{ ...record1, categoryId, autoCategoryId }, record2],
                        [otherAccountId]: [record3],
                    },
                })
            );
        });
    });

    describe('setSplitRecordCategory', () => {
        it('should set split record category', () => {
            const splitRecord1 = build<SplitRecord>({
                id: 'splitRecord1',
            });
            const splitRecord2 = build<SplitRecord>({
                id: 'splitRecord2',
            });
            const record = build<Record>({
                accountId,
                id: recordId,
                splitRecords: [splitRecord1, splitRecord2],
            });

            const newState = recordReducer(
                {
                    records: {
                        [accountId]: [record],
                    },
                },
                setSplitRecordCategory({
                    accountId,
                    recordId,
                    categoryId,
                    splitRecordId: splitRecord1.id,
                })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [
                            {
                                ...record,
                                splitRecords: [
                                    {
                                        ...splitRecord1,
                                        categoryId,
                                    },
                                    splitRecord2,
                                ],
                            },
                        ],
                    },
                })
            );
        });
    });

    describe('setSplitRecords', () => {
        it('should set split records for a record', () => {
            const record = build<Record>({
                accountId,
                id: recordId,
            });
            const splitRecords = [
                build<SplitRecord>({
                    id: 'splitRecord1',
                }),
                build<SplitRecord>({
                    id: 'splitRecord2',
                }),
            ];

            const newState = recordReducer(
                {
                    records: {
                        [accountId]: [record],
                    },
                },
                setSplitRecords({
                    accountId,
                    recordId,
                    splitRecords,
                })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [{ ...record, splitRecords }],
                    },
                })
            );
        });
    });

    describe('deleteSplitRecords', () => {
        it('should remove split records from a record', () => {
            const record = build<Record>({
                accountId,
                id: recordId,
                splitRecords: [
                    build<SplitRecord>({
                        id: 'splitRecord1',
                    }),
                    build<SplitRecord>({
                        id: 'splitRecord2',
                    }),
                ],
            });

            const newState = recordReducer(
                {
                    records: {
                        [accountId]: [record],
                    },
                },
                deleteSplitRecords({
                    accountId,
                    recordId,
                })
            );

            expect(newState).toEqual(
                build<RecordStore>({
                    records: {
                        [accountId]: [build<Record>({ id: recordId, accountId })],
                    },
                })
            );
        });
    });

    describe('extraReducers', () => {
        describe('deleteAccount', () => {
            it('should remove records when an account is deleted', () => {
                const record1 = build<Record>({
                    id: 'id1',
                    accountId,
                });
                const record2 = build<Record>({
                    id: 'id2',
                    accountId: otherAccountId,
                });

                const newState = recordReducer(
                    {
                        records: {
                            [accountId]: [record1],
                            [otherAccountId]: [record2],
                        },
                    },
                    deleteAccount(build<Account>({ id: accountId }))
                );

                expect(newState).toEqual(
                    build<RecordStore>({
                        records: {
                            [otherAccountId]: [record2],
                        },
                    })
                );
            });
        });

        describe('deleteAutoCategory', () => {
            it('should remove the auto category id from each record that matches', () => {
                const record1 = build<Record>({
                    id: 'id1',
                    accountId,
                    description: 'SuperMarket',
                    categoryId,
                    autoCategoryId,
                });
                const record2 = build<Record>({
                    id: 'id2',
                    accountId,
                    description: 'ValueStore',
                });
                const record3 = build<Record>({
                    id: 'id3',
                    accountId: otherAccountId,
                    description: 'SuperMarket',
                    categoryId,
                    autoCategoryId,
                });

                const newState = recordReducer(
                    {
                        records: {
                            [accountId]: [record1, record2],
                            [otherAccountId]: [record3],
                        },
                    },
                    deleteAutoCategory(
                        build<AutoCategory>({
                            id: autoCategoryId,
                            accountId,
                        })
                    )
                );

                expect(newState).toEqual(
                    build<RecordStore>({
                        records: {
                            [accountId]: [{ ...record1, categoryId: undefined, autoCategoryId: undefined }, record2],
                            [otherAccountId]: [record3],
                        },
                    })
                );
            });
        });
    });
});
