import { Category } from '../../models/category.type';
import { SplitRecord } from '../../models/split-record.type';

export type SplitRecordType = SplitRecord & {
    /**
     * The category to display.
     */
    category: Category;
};
