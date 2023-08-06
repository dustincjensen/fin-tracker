import { ICategory } from '../../store/category/category.interface';

export interface ICategoryTagProps {
    /**
     * The category to display.
     */
    category: ICategory;

    /**
     * A function to invoke when the X is clicked on the category tag.
     * If undefined, the X will not display.
     */
    onClear?: () => void;
}
