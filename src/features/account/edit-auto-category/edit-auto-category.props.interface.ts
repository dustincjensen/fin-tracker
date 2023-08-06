import { ICategory } from '../../../store/category/category.interface';
import { IRecord } from '../../../store/record/record.interface';

export interface IEditAutoCategoryProps {
    /**
     * The record to base the auto category off of.
     */
    record: IRecord;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<ICategory>;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
