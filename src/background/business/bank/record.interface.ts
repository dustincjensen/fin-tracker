export interface IRecord {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance?: number;
}
