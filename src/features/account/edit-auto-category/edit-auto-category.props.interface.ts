import { Category } from '../../../models/category.type';
import { Record } from '../../../models/record.type';

export interface IEditAutoCategoryProps {
    /**
     * The record to base the auto category off of.
     */
    record: Record;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<Category>;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
