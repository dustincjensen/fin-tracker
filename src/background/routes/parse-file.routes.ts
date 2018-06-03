import { parse as chequingParse } from '../business/bank/scotiabank/chequing';
import { parse as savingsParse } from '../business/bank/scotiabank/chequing';
import { parse as visaParse } from '../business/bank/scotiabank/visa';

export function parseScotiabankChequingToRecords(filePath: string) {
  const chequing = chequingParse(filePath);
  const obj = { records: chequing };
  return {
    type: 'IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_PARSED',
    args: [obj]
  };
}

export function parseScotiabankSavingsToRecords(filePath: string) {
  const savings = savingsParse(filePath);
  const obj = { records: savings };
  return {
    type: 'IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_PARSED',
    args: [obj]
  };
}

export function parseScotiabankVisaToRecords(filePath: string) {
  const visa = visaParse(filePath);
  const obj = { records: visa };
  return {
    type: 'IPC_NEW_SCOTIABANK_VISA_RECORDS_PARSED',
    args: [obj]
  };
}
