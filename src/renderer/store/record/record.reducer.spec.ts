import { build } from '../../utils/test.utils';
import { AccountActions } from '../account/account.actions';
import { IAccount } from '../account/account.interface';
import { AutoCategoryActions } from '../auto-category/auto-category.actions';
import { IAutoCategory } from '../auto-category/auto-category.interface';
import { IRecord } from '../record/record.interface';
import { RecordActions } from './record.actions';
import { RecordReducer as reducer } from './record.reducer';
import { IRecordStore } from './record.store.interface';
import { ISplitRecord } from './split-record.interface';

describe('reducers', () => {
  describe('Records', () => {
    const recordId = 'recordId';
    const accountId = 'accountId';
    const categoryId = 'categoryId';
    const autoCategoryId = 'autoCategoryId';
    const otherAccountId = 'otherAccountId';

    describe('saveNewRecords', () => {
      it('should not add records when there are no records to add', () => {
        const initialState: IRecordStore = { records: {} };

        const newState = reducer(initialState, {
          type: RecordActions.SAVE_NEW_RECORDS,
          payload: [],
        });

        expect(newState).toEqual(initialState);
      });

      it('should add records to the account', () => {
        const initialState: IRecordStore = { records: {} };
        const record = build<IRecord>({ id: recordId, accountId });

        const newState = reducer(initialState, {
          type: RecordActions.SAVE_NEW_RECORDS,
          payload: [record],
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [record],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('setDetails', () => {
      it('should set the details of the record', () => {
        const record = build<IRecord>({ id: recordId, accountId });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record],
          },
        };

        const newState = reducer(initialState, {
          type: RecordActions.SET_DETAILS,
          payload: {
            accountId,
            recordId,
            details: 'new details',
          },
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [{ ...record, details: 'new details' }],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('setRecordCategory', () => {
      it('should set the record category', () => {
        const record = build<IRecord>({ id: recordId, accountId, autoCategoryId: 'someValue' });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record],
          },
        };

        const newState = reducer(initialState, {
          type: RecordActions.SET_RECORD_CATEGORY,
          payload: {
            accountId,
            recordId,
            categoryId,
          },
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [{ ...record, categoryId, autoCategoryId: undefined }],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('setRecordAutoCategory', () => {
      it('should set the record auto category', () => {
        const record1 = build<IRecord>({
          id: 'id1',
          accountId,
          description: 'SuperMarket',
        });
        const record2 = build<IRecord>({
          id: 'id2',
          accountId,
          description: 'ValueStore',
        });
        const record3 = build<IRecord>({
          id: 'id3',
          accountId: otherAccountId,
          description: 'SuperMarket',
        });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record1, record2],
            [otherAccountId]: [record3],
          },
        };

        const newState = reducer(initialState, {
          type: RecordActions.SET_RECORD_AUTO_CATEGORY,
          payload: {
            autoCategoryId,
            accountId,
            categoryId,
            description: 'SuperMarket',
          },
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [{ ...record1, categoryId, autoCategoryId }, record2],
            [otherAccountId]: [record3],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('setSplitRecordCategory', () => {
      it('should set split record category', () => {
        const splitRecord1 = build<ISplitRecord>({
          id: 'splitRecord1',
        });
        const splitRecord2 = build<ISplitRecord>({
          id: 'splitRecord2',
        });
        const record = build<IRecord>({
          accountId,
          id: recordId,
          splitRecords: [splitRecord1, splitRecord2],
        });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record],
          },
        };

        const newState = reducer(initialState, {
          type: RecordActions.SET_SPLIT_RECORD_CATEGORY,
          payload: {
            accountId,
            recordId,
            categoryId,
            splitRecordId: splitRecord1.id,
          },
        });

        const expectedState: IRecordStore = {
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
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('setSplitRecords', () => {
      it('should set split records for a record', () => {
        const record = build<IRecord>({
          accountId,
          id: recordId,
        });
        const splitRecords = [
          build<ISplitRecord>({
            id: 'splitRecord1',
          }),
          build<ISplitRecord>({
            id: 'splitRecord2',
          }),
        ];
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record],
          },
        };

        const newState = reducer(initialState, {
          type: RecordActions.SET_SPLIT_RECORDS,
          payload: {
            accountId,
            recordId,
            splitRecords,
          },
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [{ ...record, splitRecords }],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('deleteSplitRecords', () => {
      it('should remove split records from a record', () => {
        const record = build<IRecord>({
          accountId,
          id: recordId,
          splitRecords: [
            build<ISplitRecord>({
              id: 'splitRecord1',
            }),
            build<ISplitRecord>({
              id: 'splitRecord2',
            }),
          ],
        });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record],
          },
        };

        const newState = reducer(initialState, {
          type: RecordActions.DELETE_SPLIT_RECORDS,
          payload: {
            accountId,
            recordId,
          },
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [build<IRecord>({ id: recordId, accountId })],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('deleteRecords', () => {
      it('should remove records when an account is deleted', () => {
        const record1 = build<IRecord>({
          id: 'id1',
          accountId,
        });
        const record2 = build<IRecord>({
          id: 'id2',
          accountId: otherAccountId,
        });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record1],
            [otherAccountId]: [record2],
          },
        };

        const newState = reducer(initialState, {
          type: AccountActions.DELETE_ACCOUNT,
          payload: build<IAccount>({ id: accountId }),
        });

        const expectedState: IRecordStore = {
          records: {
            [otherAccountId]: [record2],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('removeRecordAutoCategory', () => {
      it('should remove the auto category id from each record that matches', () => {
        const record1 = build<IRecord>({
          id: 'id1',
          accountId,
          description: 'SuperMarket',
          categoryId,
          autoCategoryId,
        });
        const record2 = build<IRecord>({
          id: 'id2',
          accountId,
          description: 'ValueStore',
        });
        const record3 = build<IRecord>({
          id: 'id3',
          accountId: otherAccountId,
          description: 'SuperMarket',
          categoryId,
          autoCategoryId,
        });
        const initialState: IRecordStore = {
          records: {
            [accountId]: [record1, record2],
            [otherAccountId]: [record3],
          },
        };

        const newState = reducer(initialState, {
          type: AutoCategoryActions.DELETE_AUTO_CATEGORY,
          payload: build<IAutoCategory>({
            id: autoCategoryId,
            accountId,
          }),
        });

        const expectedState: IRecordStore = {
          records: {
            [accountId]: [{ ...record1, categoryId: undefined, autoCategoryId: undefined }, record2],
            [otherAccountId]: [record3],
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });
  });
});
