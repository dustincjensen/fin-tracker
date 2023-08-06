import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Category } from '../../models/category.type';
import { saveNewCategory } from '../../store/category/category-slice';
import { ModifyCategory, ModifyCategoryProps } from './modify-category.component';

type NewCategoryProps = Pick<ModifyCategoryProps, 'close'>;

export const NewCategory = ({ close }: NewCategoryProps) => {
    const dispatch = useDispatch();

    const saveCategory = useCallback((category: Category) => dispatch(saveNewCategory(category)), [dispatch]);

    return (
        <ModifyCategory
            headerText='New Category'
            saveButtonText='Save Category'
            saveCategory={saveCategory}
            close={close}
        />
    );
};
