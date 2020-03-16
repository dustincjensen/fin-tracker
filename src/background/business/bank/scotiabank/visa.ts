import * as fs from 'fs';
import { Record } from '../record.interface';

// https://stackoverflow.com/questions/23582276/split-string-by-comma-but-ignore-commas-inside-quotes/23582323
// https://stackoverflow.com/questions/10575086/regex-to-remove-all-whitescape-except-one-between-words
const csvCommaSplitIgnoreCommaInQuotes = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
const stringRemoveExtraneousSpaces = /\s{2,}/g;
const quotes = /"/g;
const commas = /,/g;

export function parse(accountId, filePath): Record[] {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const separated = data
    .split('\n')
    .map((r, i) => {
      if (r.length === 0) return null;

      const rowSplit = r.split(csvCommaSplitIgnoreCommaInQuotes);
      const [date, empty, d, strCredit, strDebit] = rowSplit;
      const credit = parseFloat(strCredit.replace(quotes, '').replace(commas, ''));
      const debit = parseFloat(strDebit.replace(quotes, '').replace(commas, ''));
      let description = `${d.replace(quotes, '')}`.replace(stringRemoveExtraneousSpaces, ' ').trim();
      return {
        id: i,
        accountId,
        date,
        debit,
        credit,
        description,
      };
    })
    .filter(r => r != null);

  return separated;
}
