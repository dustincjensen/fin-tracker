export interface IAddNewRecordProps {
  /**
   * The account to add the record to.
   */
  accountId: string;

  /**
   * True if the dialog should be shown.
   */
  isShown: boolean;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
