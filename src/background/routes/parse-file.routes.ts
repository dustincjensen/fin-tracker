import { parse as qfxParse } from '../business/bank/qfx';
import { parse as quickenParse } from '../business/bank/quicken';
import { IRecord } from '../business/bank/record.interface';
import { parse as chequingParse, parse as savingsParse } from '../business/bank/scotiabank/chequing';
import { parse as visaParse } from '../business/bank/scotiabank/visa';
import { sortRecordsByDate } from '../business/bank/util';

export function parseScotiabankChequingToRecords(accountId: string, filePath: string) {
  return parse(chequingParse, accountId, filePath);
}

export function parseScotiabankSavingsToRecords(accountId: string, filePath: string) {
  return parse(savingsParse, accountId, filePath);
}

export function parseScotiabankVisaToRecords(accountId: string, filePath: string) {
  return parse(visaParse, accountId, filePath);
}

export function parseQuickenToRecords(
  accountId: string,
  filePath: string,
  accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
  return parse(quickenParse, accountId, filePath, accountType);
}

export function parseQfxToRecords(
  accountId: string,
  filePath: string,
  accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
  return parse(qfxParse, accountId, filePath, accountType);
}

function parse(
  method: (accountId: string, filePath: string, accountType?: 'Chequing' | 'Savings' | 'CreditCard') => IRecord[],
  accountId: string,
  filePath: string,
  accountType?: 'Chequing' | 'Savings' | 'CreditCard'
) {
  const parsedFileRecords = method(accountId, filePath, accountType);
  const sorted = sortRecordsByDate(parsedFileRecords);
  return {
    type: 'IPC_NEW_RECORDS_PARSED',
    args: [sorted],
  };
}
