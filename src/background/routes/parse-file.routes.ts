import { parse as chequingParse } from '../business/bank/scotiabank/chequing';
import { parse as savingsParse } from '../business/bank/scotiabank/chequing';
import { parse as visaParse } from '../business/bank/scotiabank/visa';

export function parseScotiabankChequingToRecords(accountId: string, filePath: string) {
  const chequing = chequingParse(accountId, filePath);
  return {
    type: 'IPC_NEW_RECORDS_PARSED',
    args: [chequing]
  };
}

export function parseScotiabankSavingsToRecords(accountId: string, filePath: string) {
  const savings = savingsParse(accountId, filePath);
  return {
    type: 'IPC_NEW_RECORDS_PARSED',
    args: [savings]
  };
}

export function parseScotiabankVisaToRecords(accountId: string, filePath: string) {
  const visa = visaParse(accountId, filePath);
  return {
    type: 'IPC_NEW_RECORDS_PARSED',
    args: [visa]
  };
}
