import { Category } from '../../models/category.type';
import { IRecord } from '../../store/record/record.interface';
import { SplitRecordType } from './split-record.type';

export type RecordType = IRecord & {
    /**
     * The category to display.
     */
    category: Category;

    /**
     * Override to hide the splitRecords definition on IRecord.
     */
    splitRecords: SplitRecordType[];
};
