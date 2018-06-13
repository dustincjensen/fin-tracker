import * as React from 'react';
import CategoryContainer from '../../containers/categories.container';
import NewCategoryContainer from '../../containers/new-category.container';

import './category.layout.scss';

export const CategoryLayout = () => {
  return (
    <div className="spacing">
      <NewCategoryContainer />
      <CategoryContainer />
    </div>
  );
}
