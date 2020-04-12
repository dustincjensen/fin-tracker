import * as path from 'path';
import { IAutoCategory } from '../business/bank/auto-category.interface';
import { parse as qfxParse } from '../business/bank/qfx';
import { parse as quickenParse } from '../business/bank/quicken';
import { IRecord } from '../business/bank/record.interface';
import { parse as chequingParse, parse as savingsParse } from '../business/bank/scotiabank/chequing';
import { parse as visaParse } from '../business/bank/scotiabank/visa';
import { sortRecordsByDate } from '../business/bank/util';

export function parseScotiabankChequingToRecords(accountId: string, filePath: string, autoCategories: IAutoCategory[]) {
  return parse(chequingParse, accountId, filePath, autoCategories);
}

export function parseScotiabankSavingsToRecords(accountId: string, filePath: string, autoCategories: IAutoCategory[]) {
  return parse(savingsParse, accountId, filePath, autoCategories);
}

export function parseScotiabankVisaToRecords(accountId: string, filePath: string, autoCategories: IAutoCategory[]) {
  return parse(visaParse, accountId, filePath, autoCategories);
}

export function parseQuickenToRecords(
  accountId: string,
  filePath: string,
  autoCategories: IAutoCategory[],
  accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
  return parse(quickenParse, accountId, filePath, autoCategories, accountType);
}

export function parseQfxToRecords(
  accountId: string,
  filePath: string,
  autoCategories: IAutoCategory[],
  accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
  return parse(qfxParse, accountId, filePath, autoCategories, accountType);
}

function parse(
  method: (
    accountId: string,
    filePath: string,
    autoCategories: IAutoCategory[],
    accountType?: 'Chequing' | 'Savings' | 'CreditCard'
  ) => IRecord[],
  accountId: string,
  filePath: string,
  autoCategories: IAutoCategory[],
  accountType?: 'Chequing' | 'Savings' | 'CreditCard'
) {
  try {
    const parsedFileRecords = method(accountId, filePath, autoCategories, accountType);
    if (!parsedFileRecords || parsedFileRecords.length === 0) {
      throw new Error('Unable to parse transactions from file.');
    }

    const sorted = sortRecordsByDate(parsedFileRecords);
    const fileName = path.basename(filePath);
    return {
      type: 'IPC_NEW_RECORDS_PARSED',
      args: [sorted, accountId, filePath, fileName],
    };
  } catch (error) {
    const fileName = path.basename(filePath);
    return {
      type: 'IPC_NEW_RECORDS_ERROR',
      args: [error.message, filePath, fileName],
    };
  }
}
