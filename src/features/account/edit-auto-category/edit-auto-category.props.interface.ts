import { Category } from '../../../models/category.type';
import { IRecord } from '../../../store/record/record.interface';

export interface IEditAutoCategoryProps {
    /**
     * The record to base the auto category off of.
     */
    record: IRecord;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<Category>;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
