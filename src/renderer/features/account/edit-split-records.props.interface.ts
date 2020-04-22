import { ICategory } from '../../store/category/category.interface';
import { ISplitRecord } from '../../store/record/split-record.interface';
import { RecordType } from './record.type';

export interface IEditSplitRecordsProps {
  /**
   * The record the splits should be associated to.
   */
  record: RecordType;

  /**
   * The list of available categories to choose from.
   */
  categories: Array<ICategory>;

  /**
   * Function to update a record with split records.
   */
  updateRecordWithSplits: (recordId: string, splitRecords: ISplitRecord[]) => void;

  /**
   * Function to close the edit split record section.
   */
  close: () => void;
}
