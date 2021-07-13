import { IInvestmentRecord } from '../../../store/investment-record/investment-record.interface';

export interface IDeleteInvestmentRecordProps {
  /**
   * The record to delete.
   */
  record: IInvestmentRecord;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
