import * as mergeFileRoutes from '../routes/merge-file.routes';
import * as parseFileRoutes from '../routes/parse-file.routes';

export const eventLookup: { [type: string]: (...args: unknown[]) => { type: string; args: unknown[] } } = {
  IPC_NEW_QUICKEN_RECORDS_SELECTED: parseFileRoutes.parseQuickenToRecords,
  IPC_NEW_QFX_RECORDS_SELECTED: parseFileRoutes.parseQfxToRecords,
  IPC_PENDING_RECORDS_MERGED: mergeFileRoutes.mergeRecords,
};
