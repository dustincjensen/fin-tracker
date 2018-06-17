import * as React from 'react';
import { CategoriesContainer } from '../../containers/categories.container';
import { NewCategoryContainer } from '../../containers/new-category.container';
import './manage-categories.layout.scss';

export const ManageCategoryLayout = () => {
  return (
    <div className="manage-categories">
      <NewCategoryContainer />
      <CategoriesContainer />
    </div>
  );
}
