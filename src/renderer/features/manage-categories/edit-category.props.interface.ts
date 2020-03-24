import { ICategory } from '../../store/category/category.interface';

export interface IEditCategoryProps
  extends IEditCategoryStateProps,
    IEditCategoryDispatchProps,
    IEditCategoryOwnProps {}

export interface IEditCategoryStateProps {
  /**
   * The optional text for the header.
   */
  headerText?: string;

  /**
   * The text for the save button.
   */
  saveButtonText: string;
}

export interface IEditCategoryDispatchProps {
  /**
   * Action to save a category.
   */
  saveCategory: (category: ICategory) => void;
}

export interface IEditCategoryOwnProps {
  /**
   * The existing category if available.
   */
  category?: ICategory;

  /**
   * A function when invoked will close the category section.
   */
  close: () => void;
}
