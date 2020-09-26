import { ICategory } from '../../../store/category/category.interface';
import { IRecord } from '../../../store/record/record.interface';
import { IStore } from '../../../store/store.interface';

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

  /**
   * A selector to access the store to get the data
   * for the specified month and account.
   */
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}
