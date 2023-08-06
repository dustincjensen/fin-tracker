import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { ModifyCategory, ModifyCategoryProps } from './modify-category.component';

type NewCategoryProps = Pick<ModifyCategoryProps, 'close'>;

export const NewCategory = ({ close }: NewCategoryProps) => {
    const dispatch = useDispatch();

    const saveCategory = useCallback(
        (category: ICategory) => dispatch(CategoryActions.saveNewCategory(category)),
        [dispatch]
    );

    return (
        <ModifyCategory
            headerText='New Category'
            saveButtonText='Save Category'
            saveCategory={saveCategory}
            close={close}
        />
    );
};
