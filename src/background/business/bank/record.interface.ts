export interface IRecord {
  id: string;
  accountId: string;
  date: string;
  description: string;
  categoryId?: string;
  autoCategoryId?: string;
  debit?: number;
  credit?: number;
  balance?: number;
}
