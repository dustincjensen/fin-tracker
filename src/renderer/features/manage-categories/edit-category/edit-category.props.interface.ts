import { ICategory } from '../../../store/category/category.interface';

export interface IEditCategoryProps {
  /**
   * The optional text for the header.
   */
  headerText?: string;

  /**
   * The text for the save button.
   */
  saveButtonText: string;

  /**
   * Action to save a category.
   */
  saveCategory: (category: ICategory) => void;

  /**
   * The existing category if available.
   */
  category?: ICategory;

  /**
   * A function when invoked will close the category section.
   */
  close: () => void;
}
