import { Category } from '../../models/category.type';
import { Record } from '../../models/record.type';
import { SplitRecordType } from './split-record.type';

export type RecordType = Record & {
    /**
     * The category to display.
     */
    category: Category;

    /**
     * Override to hide the splitRecords definition on Record.
     */
    splitRecords: SplitRecordType[];
};
