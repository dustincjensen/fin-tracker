import { Dialog } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Category } from '../../models/category.type';
import { deleteCategory } from '../../store/category/category-slice';

type DeleteCategoryProps = {
    /**
     * The category to delete.
     */
    category: Category;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
};

export const DeleteCategoryDialog = ({ category, onClose }: DeleteCategoryProps) => {
    const dispatch = useDispatch();

    if (!category) {
        return null;
    }

    const confirm = () => {
        dispatch(deleteCategory(category));
        onClose();
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
            Are you sure you want to delete the <b>&quot;{category.name}&quot;</b> category? Transactions will be kept,
            but you will need to re-associate them with a new category. Auto Categories with this category will also be
            deleted and un-associated with the transactions.
        </Dialog>
    );
};
