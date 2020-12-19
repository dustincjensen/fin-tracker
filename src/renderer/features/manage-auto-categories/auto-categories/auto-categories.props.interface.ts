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
      accountArchived: boolean;
    }
  >;

  /**
   * The auto category filter.
   */
  autoCategoryFilter: string;

  /**
   * True if archived accounts should be shown, false otherwise.
   */
  showArchived: boolean;
}
