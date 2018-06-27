import * as React from 'react';
import { CategoriesContainer } from './categories.container';
import { NewCategoryContainer } from './new-category.container';
import './manage-categories.layout.scss';

export const ManageCategoryLayout = () => {
  return (
    <div className="manage-categories">
      <NewCategoryContainer />
      <CategoriesContainer />
    </div>
  );
}
