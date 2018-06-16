export interface IRecord {
  id: string;
  accountId: string;
  date: string;
  description: string;
  debit?: number;
  credit?: number;
}
