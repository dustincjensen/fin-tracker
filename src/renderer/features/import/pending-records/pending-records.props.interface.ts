import { ICategory } from '../../../store/category/category.interface';
import { RecordType } from '../../account/record.type';

export interface IPendingRecordsProps {
  /**
   * The list of pending records.
   */
  records: RecordType[];

  /**
   * The list of categories to choose from for each record.
   */
  categories: Array<ICategory>;

  /**
   * Action to update the pending record category.
   */
  updatePendingRecordCategory: (recordId: string, categoryId: string) => void;
  
  // deletePendingRecord: (recordId: string) => void;
}
