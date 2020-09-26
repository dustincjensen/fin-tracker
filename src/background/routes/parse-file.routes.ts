import * as path from 'path';
import { parse as qfxParse } from '../business/qfx';
import { parse as quickenParse } from '../business/quicken';
import { sortRecordsByDate } from '../business/util';
import { IAutoCategory } from '../interfaces/auto-category.interface';
import { IRecord } from '../interfaces/record.interface';

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
