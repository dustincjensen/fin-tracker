import { ICategory } from '../../../store/category/category.interface';

export interface IDeleteCategoryProps {
  /**
   * The category to delete.
   */
  category: ICategory;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
