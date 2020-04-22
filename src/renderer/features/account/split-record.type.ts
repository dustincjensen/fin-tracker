import { ICategory } from '../../store/category/category.interface';
import { ISplitRecord } from '../../store/record/split-record.interface';

export type SplitRecordType = ISplitRecord & {
  /**
   * The category to display.
   */
  category: ICategory;
};
