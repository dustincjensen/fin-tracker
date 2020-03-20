import { Dispatch } from 'redux';

export type ImportRecordsFunc = (dispatch: Dispatch, accountId: string, filePath: string) => void;
