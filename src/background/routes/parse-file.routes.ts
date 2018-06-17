import { parse as chequingParse } from '../business/bank/scotiabank/chequing';
import { parse as savingsParse } from '../business/bank/scotiabank/chequing';
import { parse as visaParse } from '../business/bank/scotiabank/visa';
import { sortAndCalculateBalance } from '../business/bank/util';
import { Record } from '../business/bank/record.interface';

export function parseScotiabankChequingToRecords(accountId: string, filePath: string, startingBalance: number, records: Record[]) {
  return parse(chequingParse, accountId, filePath, startingBalance, records);
}

export function parseScotiabankSavingsToRecords(accountId: string, filePath: string, startingBalance: number, records: Record[]) {
  return parse(savingsParse, accountId, filePath, startingBalance, records);
}

export function parseScotiabankVisaToRecords(accountId: string, filePath: string, startingBalance: number, records: Record[]) {
  return parse(visaParse, accountId, filePath, startingBalance, records);
}

function parse(
  method: (accountId: string, filePath: string) => Record[],
  accountId: string,
  filePath: string,
  startingBalance: number,
  records: Record[]
) {
  const parsedFileRecords = method(accountId, filePath);
  const sortedWithBalances = sortAndCalculateBalance(startingBalance, parsedFileRecords, records);
  return {
    type: 'IPC_NEW_RECORDS_PARSED',
    args: [sortedWithBalances]
  };
}
