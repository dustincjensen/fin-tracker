import { ICategory } from './category.interface';

export interface ICategoryStore {
  /**
   * The categories to assign to records.
   */
  categories: { [id: string]: ICategory };
}
