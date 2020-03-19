import { ICategory } from '../../store/category/category.interface';

export interface INewCategoryProps extends INewCategoryDispatchProps {}

export interface INewCategoryDispatchProps {
  /**
   * Action to save a new category.
   */
  saveNewCategory: (category: ICategory) => void;
}
