import * as fs from 'fs';
import { IAutoCategory } from '../auto-category.interface';
import { newGuid } from '../guid.util';
import { IRecord } from '../record.interface';

// https://stackoverflow.com/questions/23582276/split-string-by-comma-but-ignore-commas-inside-quotes/23582323
// https://stackoverflow.com/questions/10575086/regex-to-remove-all-whitescape-except-one-between-words
const csvCommaSplitIgnoreCommaInQuotes = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
const stringRemoveExtraneousSpaces = /\s{2,}/g;
const quotes = /"/g;

export function parse(accountId: string, filePath: string, autoCategories: IAutoCategory[]): IRecord[] {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const separated = data
    .split('\n')
    .map(r => {
      if (r.length === 0) return null;

      const rowSplit = r.split(csvCommaSplitIgnoreCommaInQuotes);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [date, strAmount, dash, d1, d2] = rowSplit;
      const amount = parseFloat(strAmount);
      const description = `${d2.replace(quotes, '')} ${d1.replace(quotes, '')}`
        .replace(stringRemoveExtraneousSpaces, ' ')
        .trim();
      const autoCategoryMatch = autoCategories?.find(ac => description.startsWith(ac.description));

      const record: IRecord = {
        id: newGuid(),
        accountId,
        date,
        description,
        autoCategoryId: autoCategoryMatch?.id,
        categoryId: autoCategoryMatch?.categoryId,
        debit: amount <= 0 ? amount * -1 : null,
        credit: amount > 0 ? amount : null,
      };

      return record;
    })
    .filter(r => r != null);

  return separated;
}
