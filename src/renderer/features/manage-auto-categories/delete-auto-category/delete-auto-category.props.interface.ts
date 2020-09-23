import { IAutoCategory } from '../../../store/auto-category/auto-category.interface';

export interface IDeleteAutoCategoryProps {
  /**
   * The auto category to delete.
   */
  autoCategory: IAutoCategory;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
