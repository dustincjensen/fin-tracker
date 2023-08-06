import { IRecord } from '../../../store/record/record.interface';

export interface IDeleteRecordProps {
  /**
   * The record to delete.
   */
  record: IRecord;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
