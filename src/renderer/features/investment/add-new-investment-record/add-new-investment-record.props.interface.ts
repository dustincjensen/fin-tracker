export interface IAddNewInvestmentRecordProps {
  /**
   * The account to add the record to.
   */
  accountId: string;

  /**
   * The currency type for the record.
   */
  currency: string;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
