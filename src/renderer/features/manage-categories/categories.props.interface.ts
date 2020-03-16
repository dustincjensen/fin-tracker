import { ICategory } from '../../store/category/category.interface';

export interface ICategoriesProps extends ICategoriesStateProps, ICategoriesDispatchProps {};

export interface ICategoriesStateProps {
    /**
     * The list of categories to display.
     */
    categories: ICategory[];
}

export interface ICategoriesDispatchProps {
    /**
     * Action to delete a category.
     */
    deleteCategory: (categoryId: string) => void;
}