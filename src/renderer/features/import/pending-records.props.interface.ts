import { RecordType } from '../account/record.type';

export interface IPendingRecordsProps extends IPendingRecordsStateProps, IPendingRecordsDispatchProps {}

export interface IPendingRecordsStateProps {
  /**
   * The list of pending records.
   */
  records: RecordType[];

  /**
   * The list of categories to choose from for each record.
   */
  categories: Array<{
    color: string;
    label: string;
    value: string;
  }>;
}

export interface IPendingRecordsDispatchProps {
  // deletePendingRecord: (recordId: string) => void;
  updatePendingRecordCategory: (recordId: string, categoryId: string) => void;
}
