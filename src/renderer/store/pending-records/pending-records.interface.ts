import { IRecord } from '../records/record.interface';

export interface PendingRecords {
  records: IRecord[];
  accountId: string;
}
