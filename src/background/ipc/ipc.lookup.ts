import { IProcessedEvent } from './ipc.interface';
import * as parseFileRoutes from '../routes/parse-file.routes';
import * as mergeFileRoutes from '../routes/merge-file.routes';

export const eventLookup: { [type: string]: (...args: unknown[]) => IProcessedEvent } = {
  IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED: parseFileRoutes.parseScotiabankChequingToRecords,
  IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED: parseFileRoutes.parseScotiabankSavingsToRecords,
  IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED: parseFileRoutes.parseScotiabankVisaToRecords,
  IPC_PENDING_RECORDS_MERGED: mergeFileRoutes.mergeRecords,
};
