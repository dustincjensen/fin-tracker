import IAccount from './account/account.interface';
import IRecord from './records/record.interface';

export default interface IStore {
  accounts: { [id: string]: IAccount };
  records: IRecord[];
}
