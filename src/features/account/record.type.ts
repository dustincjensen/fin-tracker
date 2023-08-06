import { ICategory } from '../../store/category/category.interface';
import { IRecord } from '../../store/record/record.interface';
import { SplitRecordType } from './split-record.type';

export type RecordType = IRecord & {
  /**
   * The category to display.
   */
  category: ICategory;

  /**
   * Override to hide the splitRecords definition on IRecord.
   */
  splitRecords: SplitRecordType[];
};
