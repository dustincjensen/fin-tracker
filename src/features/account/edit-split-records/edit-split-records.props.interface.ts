import { ICategory } from '../../../store/category/category.interface';
import { RecordType } from '../record.type';

export interface IEditSplitRecordsProps {
    /**
     * The record the splits should be associated to.
     */
    record: RecordType;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<ICategory>;

    /**
     * Function to close the edit split record section.
     */
    onClose: () => void;
}
