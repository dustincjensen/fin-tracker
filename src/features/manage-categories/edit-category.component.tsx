import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Category } from '../../models/category.type';
import { updateCategory } from '../../store/category/category-slice';
import { ModifyCategory, ModifyCategoryProps } from './modify-category.component';

type EditCategoryProps = Pick<ModifyCategoryProps, 'close' | 'category'>;

export const EditCategory = ({ close, category }: EditCategoryProps) => {
    const dispatch = useDispatch();

    const saveCategory = useCallback((category: Category) => dispatch(updateCategory(category)), [dispatch]);

    return (
        <ModifyCategory
            saveButtonText='Update Category'
            category={category}
            saveCategory={saveCategory}
            close={close}
        />
    );
};
