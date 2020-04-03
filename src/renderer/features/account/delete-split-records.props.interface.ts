import { IRecord } from '../../store/record/record.interface';

export interface IDeleteSplitRecordsProps {
  /**
   * The record to delete the split records from.
   */
  record: IRecord;

  /**
   * Action to perform when the modal is closed without confirming.
   */
  onClose: () => void;

  /**
   * Action to perform when the modal is closed after confirming.
   */
  onConfirm: () => void;

  /**
   * Action to delete the split records from the record.
   */
  deleteRecordSplitRecords: (record: IRecord) => void;
}
