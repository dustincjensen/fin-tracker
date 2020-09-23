import { ICategory } from '../../../store/category/category.interface';

export interface ICategoriesProps {
  /**
   * The list of categories to display.
   */
  categories: ICategory[];

  /**
   * The category filter.
   */
  categoryFilter: string;
}
