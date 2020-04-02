import { IRecord } from '../../store/record/record.interface';
import { SplitRecordType } from './split-record.type';

export type RecordType = IRecord & {
  /**
   * The category to display.
   * Provides the label, color and value (id) of the category.
   */
  category: {
    color: string;
    label: string;
    value: string;
  };

  /**
   * Override to hide the splitRecords definition on IRecord.
   * SplitRecordType also provides the category with color, label and value.
   */
  splitRecords: SplitRecordType[];
};
