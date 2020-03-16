import { Dispatch } from 'redux';
import { IRecord } from './record.interface';

export type MergeRecordsFunc = (
  dispatch: Dispatch,
  startingBalance: number,
  newRecords: IRecord[],
  existingRecords: IRecord[]
) => void;
