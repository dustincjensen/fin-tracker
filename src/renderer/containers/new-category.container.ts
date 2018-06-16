import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { NewCategory } from '../components/categories/new-category.component';
import { INewCategoryProps } from '../components/categories/new-category.interface';
import { SaveNewCategory } from '../store/category/category.actions';
import { ICategory } from '../store/category/category.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewCategoryProps => {
  return {
    saveNewCategory: (category: ICategory) => dispatch(SaveNewCategory(category)),
  };
};

export const NewCategoryContainer = connect(null, mapDispatchToProps)(NewCategory);
