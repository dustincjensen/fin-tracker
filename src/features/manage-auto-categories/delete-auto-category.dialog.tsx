import { Dialog } from 'evergreen-ui';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AutoCategory } from '../../models/auto-category.type';
import { deleteAutoCategory } from '../../store/auto-category/auto-category-slice';

type DeleteAutoCategoryProps = {
    /**
     * The auto category to delete.
     */
    autoCategory: AutoCategory;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
};

export const DeleteAutoCategoryDialog = ({ autoCategory, onClose }: DeleteAutoCategoryProps) => {
    const dispatch = useDispatch();

    const confirm = useCallback(() => {
        dispatch(deleteAutoCategory(autoCategory));
        onClose();
    }, [autoCategory, dispatch, onClose]);

    if (!autoCategory) {
        return null;
    }

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
            Are you sure you want to delete the <b>&quot;{autoCategory.description}&quot;</b> auto category? Records
            will be kept, but you will need to re-associate them with a new category.
        </Dialog>
    );
};
