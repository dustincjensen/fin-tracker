import { ICategory } from '../../../store/category/category.interface';
import { RecordType } from '../record.type';

export interface IAccountMonthlyProps {
  /**
   * The records to display.
   */
  records: RecordType[];

  /**
   * The list of categories to choose from for each record.
   */
  categories: Array<ICategory>;

  /**
   * Function to update a category in state.
   */
  updateCategory: (recordId: string, categoryId: string) => void;

  /**
   * Function to update a split record category in state.
   */
  updateSplitRecordCategory: (recordId: string, splitRecordId: string, categoryId: string) => void;

  /**
   * The ID of the account to display.
   */
  accountId: string;

  /**
   * The first date of the month to get the data for.
   */
  date: string;
}
