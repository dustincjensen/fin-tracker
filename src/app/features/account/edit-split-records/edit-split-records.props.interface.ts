import { Category } from '../../../models/category.type';
import { RecordType } from '../record.type';

export interface IEditSplitRecordsProps {
    /**
     * The record the splits should be associated to.
     */
    record: RecordType;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<Category>;

    /**
     * Function to close the edit split record section.
     */
    onClose: () => void;
}
