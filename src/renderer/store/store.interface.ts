import { IAccountStore } from './account/account.store.interface';
import { ICategoryStore } from './category/category.store.interface';
import { IPendingRecordStore } from './pending-record/pending-record.store.interface';
import { IRecordStore } from './record/record.store.interface';

export interface IStore {
  accounts: IAccountStore;
  categories: ICategoryStore;
  pendingRecords: IPendingRecordStore;
  records: IRecordStore;
}
