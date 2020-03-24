import { ICategory } from '../../store/category/category.interface';

export interface ICategoriesProps extends ICategoriesStateProps, ICategoriesDispatchProps, ICategoriesOwnProps {}

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
  deleteCategory: (category: ICategory) => void;
}

export interface ICategoriesOwnProps {
  /**
   * The category filter.
   */
  categoryFilter: string;
}
