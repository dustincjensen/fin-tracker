import { ParseType } from '../../../store/pending-record/parse.type';

export interface INewRecordsState {
  /**
   * The selected file.
   */
  selectedFile?: File;

  /**
   * If the form hasn't been filled out correctly.
   */
  formError?: string;

  /**
   * The account Id to import the records to.
   */
  selectedAccountId?: string;

  /**
   * The method to parse the selected file.
   */
  importMethod: ParseType;
}
