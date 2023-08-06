import { AutoCategory } from '../../models/auto-category.type';
import { Record } from '../../models/record.type';
import { newGuid } from '../../utils/guid.utils';

const stringRemoveExtraneousSpaces = /\s{2,}/g;

export function parse(accountId: string, file: File, autoCategories: AutoCategory[]): Record[] {
    const fileReader = new FileReaderSync();
    const data = fileReader.readAsText(file, 'utf-8');

    // const data = fs.readFileSync(file, { encoding: 'utf-8' });
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

            const credit = amount !== undefined && amount > 0 ? amount : undefined;
            const debit = amount !== undefined && amount <= 0 ? amount * -1 : undefined;

            const description = `${payee}${date ? ' ' + memo : ''}`.replace(stringRemoveExtraneousSpaces, ' ').trim();
            const autoCategoryMatch = autoCategories?.find(ac => description.startsWith(ac.description));

            const record: Record = {
                id: newGuid(),
                accountId,
                date: (date ? date : memo) as string,
                description,
                autoCategoryId: autoCategoryMatch?.id,
                categoryId: autoCategoryMatch?.categoryId,
                debit,
                credit,
            };

            return record;
        })
        .filter(r => r != null && r.date != null);

    return separated as Record[];
}
