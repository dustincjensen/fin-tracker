import * as fs from 'fs';
import { IAutoCategory } from './auto-category.interface';
import { newGuid } from './guid.util';
import { IRecord } from './record.interface';

const stringRemoveExtraneousSpaces = /\s{2,}/g;

export function parse(accountId: string, filePath: string, autoCategories: IAutoCategory[]): IRecord[] {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const separated = data
    .split('^')
    .map(r => {
      if (r.length === 0) return null;

      const rowSplit = r.split('\n').filter(s => s.trim() !== '');
      let date, amount, payee, memo;
      for (const row of rowSplit) {
        if (row.indexOf('D') === 0) date = row.slice(1).trim();
        // if (row.indexOf('N') === 0) number = row.slice(1).trim();
        if (row.indexOf('P') === 0) payee = row.slice(1).trim();
        if (row.indexOf('M') === 0) memo = row.slice(1).trim();
        if (row.indexOf('T') === 0) {
          const t = row.slice(1).trim();
          amount = t ? parseFloat(t) : undefined;
        }
      }

      const credit = amount > 0 ? amount : undefined;
      const debit = amount <= 0 ? amount * -1 : undefined;

      const description = `${payee}${date ? ' ' + memo : ''}`.replace(stringRemoveExtraneousSpaces, ' ').trim();
      const autoCategoryMatch = autoCategories?.find(ac => description.startsWith(ac.description));

      const record: IRecord = {
        id: newGuid(),
        accountId,
        date: date ? date : memo,
        description,
        autoCategoryId: autoCategoryMatch?.id,
        categoryId: autoCategoryMatch?.categoryId,
        debit,
        credit,
      };

      return record;
    })
    .filter(r => r != null && r.date != null);

  return separated;
}
