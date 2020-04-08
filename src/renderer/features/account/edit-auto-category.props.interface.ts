import { IRecord } from '../../store/record/record.interface';

export interface IEditAutoCategoryProps {
  /**
   * The record to base the auto category off of.
   */
  record: IRecord;

  /**
   * The list of available categories to choose from.
   */
  categories: Array<{
    color: string;
    label: string;
    value: string;
  }>;

  /**
   * Action to perform when the modal is closed without confirming.
   */
  onClose: () => void;

  /**
   * Action to perform when the modal is closed after confirming.
   */
  onConfirm: () => void;

  /**
   * Action to set up the auto categorization.
   */
  autoCategorizeRecords: (autoCategoryId: string, categoryId: string, description: string, overwriteExisting: boolean) => void;
}
