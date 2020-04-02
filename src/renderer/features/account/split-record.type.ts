import { ISplitRecord } from '../../store/record/split-record.interface';

export type SplitRecordType = ISplitRecord & {
  /**
   * The category to display.
   * Provides the label, color and value (id) of the category.
   */
  category: {
    color: string;
    label: string;
    value: string;
  };
};
