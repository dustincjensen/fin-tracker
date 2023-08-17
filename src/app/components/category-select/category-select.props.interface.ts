import { Category } from '../../models/category.type';

export interface ICategorySelectProps {
    /**
     * The record with category and id.
     */
    record: {
        id: string;
        category: Category;
    };

    /**
     * The categories to choose from.
     */
    categories: Array<Category>;

    /**
     * The function to update the record with a category id.
     */
    updateCategory: (recordId: string, categoryId: string) => void;

    /**
     * If true, the button will be disabled.
     */
    disabled?: boolean;
}
