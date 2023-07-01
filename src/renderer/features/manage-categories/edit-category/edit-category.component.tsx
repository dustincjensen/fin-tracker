import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryActions } from '../../../store/category/category.actions';
import { ICategory } from '../../../store/category/category.interface';
import { ModifyCategory } from '../modify-category/modify-category.component';
import { IModifyCategoryProps } from '../modify-category/modify-category.props.interface';

type EditCategoryProps = Pick<IModifyCategoryProps, 'close' | 'category'>;

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
