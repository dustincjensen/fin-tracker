import * as React from 'react';
import { IDeleteCategoryProps } from './delete-category.props.interface';
import { Dialog } from 'evergreen-ui';

export const DeleteCategoryDialog: React.FC<IDeleteCategoryProps> = props => {
  const { category, onClose, onConfirm, deleteCategory } = props;

  if (!category) {
    return null;
  }

  const confirm = () => {
    deleteCategory(category.id);
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
      Are you sure you want to delete the <b>&quot;{category.name}&quot;</b> category? Records will be kept, but you
      will need to re-associate them with a new category.
    </Dialog>
  );
};
