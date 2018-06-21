import { Dispatch } from "redux";
import { IRecord } from './record.interface';

export type ImportRecordsFunc = (
  dispatch: Dispatch,
  accountId: string,
  filePath: string,
  startingBalance: number,
  records: IRecord[]
) => void;
