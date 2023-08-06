import { ICategory } from '../../../store/category/category.interface';
import { SplitRecordType } from '../split-record.type';

export interface ISplitRecordsProps {
    /**
     * The split records that are underneath the record.
     */
    records: SplitRecordType[];

    /**
     * The categories to choose from.
     */
    categories: Array<ICategory>;

    /**
     * The function to update the split record with a category id.
     */
    updateCategory: (splitRecordId: string, categoryId: string) => void;
}
