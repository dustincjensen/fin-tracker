import { IProcessedEvent } from './ipc.interface';
import * as parseFileRoutes from '../routes/parse-file.routes';

export const eventLookup: { [type: string]: (...args: any[]) => IProcessedEvent } = {
  ['IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_SELECTED']: parseFileRoutes.parseScotiabankChequingToRecords,
  ['IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_SELECTED']: parseFileRoutes.parseScotiabankSavingsToRecords,
  ['IPC_NEW_SCOTIABANK_VISA_RECORDS_SELECTED']: parseFileRoutes.parseScotiabankVisaToRecords
};