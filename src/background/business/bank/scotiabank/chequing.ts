import * as fs from 'fs';
import { Record } from '../record.interface';

// https://stackoverflow.com/questions/23582276/split-string-by-comma-but-ignore-commas-inside-quotes/23582323
// https://stackoverflow.com/questions/10575086/regex-to-remove-all-whitescape-except-one-between-words
const csvCommaSplitIgnoreCommaInQuotes = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
const stringRemoveExtraneousSpaces = /\s{2,}/g;
const quotes = /"/g;

export function parse(filePath): Record[] {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const separated = data
    .split('\n')
    .map((r, i) => {
      if (r.length === 0) return null;

      const rowSplit = r.split(csvCommaSplitIgnoreCommaInQuotes);
      const [date, strAmount, dash, d1, d2] = rowSplit;
      const amount = parseFloat(strAmount);
      let description =
        `${d1.replace(quotes, '')} ${d2.replace(quotes, '')}`
          .replace(stringRemoveExtraneousSpaces, ' ')
          .trim();
      return {
        id: i,
        date,
        debit: amount < 0 ? amount * -1 : null,
        credit: amount >= 0 ? amount : null,
        description
      }
    })
    .filter(r => r != null);

  return separated;
}
