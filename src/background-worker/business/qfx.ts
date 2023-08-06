import { AutoCategory } from '../../models/auto-category.type';
import { Record } from '../../models/record.type';
import { newGuid } from '../../utils/guid.utils';

const stringRemoveExtraneousSpaces = /\s{2,}/g;

export function parse(accountId: string, file: File, autoCategories: AutoCategory[]): Record[] {
    const fileReader = new FileReaderSync();
    const data = fileReader.readAsText(file, 'utf-8');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let record: any = {};
    let tranStarted = false;
    const separated = data
        .split('\n')
        .map(r => {
            if (r.length === 0) {
                return null;
            }

            if (r.indexOf('VERSION') === 0) console.log(r);
            if (r.indexOf('<STMTTRN>') === 0) {
                tranStarted = true;
                record = {};
            }
            if (r.indexOf('</STMTTRN>') === 0) {
                tranStarted = false;
                return record;
            }

            if (tranStarted) {
                // Transaction type
                if (r.indexOf('<TRNTYPE>') === 0) {
                    record.type = r.slice('<TRNTYPE>'.length).trim();
                }
                // Date posted
                if (r.indexOf('<DTPOSTED>') === 0) {
                    const d = r.slice('<DTPOSTED>'.length).trim();
                    record.date = `${d.slice(4, 6)}/${d.slice(6, 8)}/${d.slice(0, 4)}`;
                }
                // Amount
                if (r.indexOf('<TRNAMT>') === 0) {
                    record.amount = parseFloat(r.slice('<TRNAMT>'.length).trim());
                }
                // Name
                if (r.indexOf('<NAME>') === 0) {
                    record.name = r.slice('<NAME>'.length).trim();
                }
                // Memo
                if (r.indexOf('<MEMO>') === 0) {
                    record.memo = r.slice('<MEMO>'.length).trim();
                }
            }

            return null;
        })
        .filter(r => r != null)
        .map(r => {
            const { date, amount, name, memo } = r;
            const credit = amount >= 0 ? amount : undefined;
            const debit = amount < 0 ? amount * -1 : undefined;
            const description = `${name}${memo ? ' ' + memo : ''}`.replace(stringRemoveExtraneousSpaces, ' ').trim();
            const autoCategoryMatch = autoCategories?.find(ac => description.startsWith(ac.description));

            const record: Record = {
                id: newGuid(),
                accountId,
                date,
                description,
                autoCategoryId: autoCategoryMatch?.id,
                categoryId: autoCategoryMatch?.categoryId,
                debit,
                credit,
            };

            return record;
        });

    return separated;
}
