import * as mergeFileRoutes from '../routes/merge-file.routes';
import * as parseFileRoutes from '../routes/parse-file.routes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eventLookup: { [type: string]: (...args: any[]) => { type: string; args: any[] } } = {
  IPC_NEW_QUICKEN_RECORDS_SELECTED: parseFileRoutes.parseQuickenToRecords,
  IPC_NEW_QFX_RECORDS_SELECTED: parseFileRoutes.parseQfxToRecords,
  IPC_NEW_RECORDS_MERGED: mergeFileRoutes.mergeRecords,
};
