import { ICategory } from '../../../store/category/category.interface';
import { IRecord } from '../../../store/record/record.interface';

export interface IAccountCategoryTotalsChartProps {
  /**
   * The records to build the chart from.
   */
  records: IRecord[];

  /**
   * The list of categories available in the system.
   */
  categories: ICategory[];

  /**
   * The ID of the account to display.
   */
  accountId: string;

  /**
   * The first date of the month to get the data for.
   */
  date: string;
}
