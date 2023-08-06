import { WorkerReturnType } from '../../models/_worker-return.type';
import { AutoCategory } from '../../models/auto-category.type';
import { Record } from '../../models/record.type';
import { parse as qfxParse } from '../business/qfx';
import { parse as quickenParse } from '../business/quicken';
import { sortRecordsByDate } from '../business/util';

export function parseQuickenToRecords(
  accountId: string,
  file: File,
  autoCategories: AutoCategory[],
  accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
  return parse(quickenParse, accountId, file, autoCategories, accountType);
}

export function parseQfxToRecords(
  accountId: string,
  file: File,
  autoCategories: AutoCategory[],
  accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
  return parse(qfxParse, accountId, file, autoCategories, accountType);
}

function parse(
  method: (
    accountId: string,
    file: File,
    autoCategories: AutoCategory[],
    accountType?: 'Chequing' | 'Savings' | 'CreditCard'
  ) => Record[],
  accountId: string,
  file: File,
  autoCategories: AutoCategory[],
  accountType?: 'Chequing' | 'Savings' | 'CreditCard'
): {
  type: WorkerReturnType;
  args: Array<unknown>;
} {
  try {
    const parsedFileRecords = method(accountId, file, autoCategories, accountType);
    if (!parsedFileRecords || parsedFileRecords.length === 0) {
      throw new Error('Unable to parse transactions from file.');
    }

    const sorted = sortRecordsByDate(parsedFileRecords);
    const fileName = file.name;
    return {
      type: 'NEW_RECORDS_PARSED',
      args: [sorted, accountId, file, fileName],
    };
  } catch (error) {
    const fileName = file.name;
    return {
      type: 'NEW_RECORDS_ERROR',
      args: [error.message, file, fileName],
    };
  }
}
