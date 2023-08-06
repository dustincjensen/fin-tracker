import { ICategory } from '../../store/category/category.interface';

export interface ICategorySelectProps {
    /**
     * The record with category and id.
     */
    record: {
        id: string;
        category: ICategory;
    };

    /**
     * The categories to choose from.
     */
    categories: Array<ICategory>;

    /**
     * The function to update the record with a category id.
     */
    updateCategory: (recordId: string, categoryId: string) => void;

    /**
     * If true, the button will be disabled.
     */
    disabled?: boolean;
}
