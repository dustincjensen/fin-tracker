import { ParseType } from '../../store/pending-record/parse.type';

export interface INewRecordsState {
  /**
   * The selected file.
   */
  selectedFile?: File;

  /**
   * The account Id to import the records to.
   */
  selectedAccountId?: string;

  /**
   * The method to parse the selected file.
   */
  importMethod: ParseType;
}
