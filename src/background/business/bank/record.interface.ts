export interface IRecord {
  id: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance?: number;
}
