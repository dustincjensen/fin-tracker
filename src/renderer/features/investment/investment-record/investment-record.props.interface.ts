import { IInvestmentRecord } from "../../../store/investment-record/investment-record.interface";

export interface IInvestmentRecordProps {
  /**
   * The investment record.
   */
  record: IInvestmentRecord;

  /**
   * UseState setter for the record to delete.
   */
  setRecordToDelete: React.Dispatch<React.SetStateAction<IInvestmentRecord>>;
}