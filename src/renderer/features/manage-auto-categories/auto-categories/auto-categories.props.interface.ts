import { IAutoCategory } from '../../../store/auto-category/auto-category.interface';
import { ICategory } from '../../../store/category/category.interface';

export interface IAutoCategoriesProps {
  /**
   * The auto categories to display.
   */
  autoCategories: Array<
    IAutoCategory & {
      accountName: string;
      category: ICategory;
      numberOfRecords: number;
    }
  >;

  /**
   * The auto category filter.
   */
  autoCategoryFilter: string;
}
