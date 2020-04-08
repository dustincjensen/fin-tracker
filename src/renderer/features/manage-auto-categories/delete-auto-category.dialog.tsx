import { Dialog } from 'evergreen-ui';
import * as React from 'react';
import { IDeleteAutoCategoryProps } from './delete-auto-category.props.interface';

export const DeleteAutoCategoryDialog: React.FC<IDeleteAutoCategoryProps> = props => {
  const { autoCategory, onClose, onConfirm, deleteAutoCategory } = props;

  if (!autoCategory) {
    return null;
  }

  const confirm = () => {
    deleteAutoCategory(autoCategory);
    onConfirm();
  };

  return (
    <Dialog
      isShown={true}
      onCloseComplete={onClose}
      preventBodyScrolling
      intent='danger'
      confirmLabel='Delete'
      title='Delete Auto Category?'
      onConfirm={confirm}
    >
      Are you sure you want to delete the <b>&quot;{autoCategory.description}&quot;</b> auto category? Records will be kept, but you
      will need to re-associate them with a new category.
    </Dialog>
  );
};
