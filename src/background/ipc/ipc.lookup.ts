import * as mergeFileRoutes from '../routes/merge-file.routes';
import * as parseFileRoutes from '../routes/parse-file.routes';
import { IProcessedEvent } from './ipc.interface';

export const eventLookup: { [type: string]: (...args: unknown[]) => IProcessedEvent } = {
  IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED: parseFileRoutes.parseScotiabankChequingToRecords,
  IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED: parseFileRoutes.parseScotiabankSavingsToRecords,
  IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED: parseFileRoutes.parseScotiabankVisaToRecords,
  IPC_NEW_QUICKEN_RECORDS_SELECTED: parseFileRoutes.parseQuickenToRecords,
  IPC_NEW_QFX_RECORDS_SELECTED: parseFileRoutes.parseQfxToRecords,
  IPC_PENDING_RECORDS_MERGED: mergeFileRoutes.mergeRecords,
};
