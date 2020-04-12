import { Dialog } from 'evergreen-ui';
import * as React from 'react';
import { IDeleteCategoryProps } from './delete-category.props.interface';

export const DeleteCategoryDialog: React.FC<IDeleteCategoryProps> = props => {
  const { category, onClose, onConfirm, deleteCategory } = props;

  if (!category) {
    return null;
  }

  const confirm = () => {
    deleteCategory(category);
    onConfirm();
  };

  return (
    <Dialog
      isShown={true}
      onCloseComplete={onClose}
      preventBodyScrolling
      intent='danger'
      confirmLabel='Delete'
      title='Delete Category?'
      onConfirm={confirm}
    >
      Are you sure you want to delete the <b>&quot;{category.name}&quot;</b> category?
      Transactions will be kept, but you will need to re-associate them with a new category.
      Auto Categories with this category will also be deleted and un-associated with the transactions.
    </Dialog>
  );
};
