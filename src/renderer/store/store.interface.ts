import { IAccount } from './account/account.interface';
import { ICategory } from './category/category.interface';
import { IRecord } from './records/record.interface';
import { PendingRecords } from './pending-records/pending-records.interface';

export interface IStore {
  accounts: { [id: string]: IAccount };
  categories: ICategory[];
  pendingRecords: PendingRecords;
  records: IRecord[];
}
