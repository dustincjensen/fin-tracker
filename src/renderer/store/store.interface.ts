import { IAccount } from './account/account.interface';
import { ICategory } from './category/category.interface';
import { IRecord } from './records/record.interface';

export interface IStore {
  accounts: { [id: string]: IAccount };
  categories: ICategory[];
  records: IRecord[];
}
