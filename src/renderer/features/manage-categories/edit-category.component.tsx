import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { ModifyCategory, ModifyCategoryProps } from './modify-category.component';

type EditCategoryProps = Pick<ModifyCategoryProps, 'close' | 'category'>;

export const EditCategory = ({ close, category }: EditCategoryProps) => {
  const dispatch = useDispatch();

  const saveCategory = useCallback(
    (category: ICategory) => dispatch(CategoryActions.updateCategory(category)),
    [dispatch]
  );

  return (
    <ModifyCategory saveButtonText='Update Category' category={category} saveCategory={saveCategory} close={close} />
  );
};
