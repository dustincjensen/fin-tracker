import { ICategory } from '../../store/category/category.interface';

export interface IDeleteCategoryProps {
  /**
   * The category to delete.
   */
  category: ICategory;

  /**
   * Action to perform when the modal is closed without confirming.
   */
  onClose: () => void;

  /**
   * Action to perform when the modal is closed after confirming.
   */
  onConfirm: () => void;

  /**
   * Action to delete the category.
   */
  deleteCategory: (categoryId: string) => void;
}
