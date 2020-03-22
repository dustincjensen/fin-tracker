import { ICategory } from '../../store/category/category.interface';

export interface INewCategoryProps extends INewCategoryDispatchProps, INewCategoryOwnProps {}

export interface INewCategoryDispatchProps {
  /**
   * Action to save a new category.
   */
  saveNewCategory: (category: ICategory) => void;
}

export interface INewCategoryOwnProps {
  /**
   * A function when invoked will close the new category section.
   */
  close: () => void;
}
