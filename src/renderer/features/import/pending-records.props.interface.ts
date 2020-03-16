import { IRecord } from '../../store/records/record.interface';

export interface IPendingRecordsProps extends IPendingRecordsStateProps, IPendingRecordsDispatchProps {}

export interface IPendingRecordsStateProps {
  /**
   * The list of pending records.
   */
  records: IRecord[];
}

export interface IPendingRecordsDispatchProps {}
