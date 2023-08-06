import { Category } from '../../models/category.type';
import { ISplitRecord } from '../../store/record/split-record.interface';

export type SplitRecordType = ISplitRecord & {
    /**
     * The category to display.
     */
    category: Category;
};
