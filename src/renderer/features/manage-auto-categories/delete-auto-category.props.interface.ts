import { IAutoCategory } from '../../store/auto-category/auto-category.interface';

export interface IDeleteAutoCategoryProps {
  /**
   * The auto category to delete.
   */
  autoCategory: IAutoCategory;

  /**
   * Action to perform when the modal is closed without confirming.
   */
  onClose: () => void;

  /**
   * Action to perform when the modal is closed after confirming.
   */
  onConfirm: () => void;

  /**
   * Action to delete the auto category.
   */
  deleteAutoCategory: (autoCategory: IAutoCategory) => void;
}
