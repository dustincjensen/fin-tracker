import { parse as chequingParse } from '../business/bank/scotiabank/chequing';
import { parse as savingsParse } from '../business/bank/scotiabank/chequing';
import { parse as visaParse } from '../business/bank/scotiabank/visa';
import { sortRecordsByDate } from '../business/bank/util';
import { Record } from '../business/bank/record.interface';

export function parseScotiabankChequingToRecords(accountId: string, filePath: string) {
  return parse(chequingParse, accountId, filePath);
}

export function parseScotiabankSavingsToRecords(accountId: string, filePath: string) {
  return parse(savingsParse, accountId, filePath);
}

export function parseScotiabankVisaToRecords(accountId: string, filePath: string) {
  return parse(visaParse, accountId, filePath);
}

function parse(
  method: (accountId: string, filePath: string) => Record[],
  accountId: string,
  filePath: string
) {
  const parsedFileRecords = method(accountId, filePath);
  const sorted = sortRecordsByDate(parsedFileRecords);
  return {
    type: 'IPC_NEW_RECORDS_PARSED',
    args: [sorted]
  };
}
