import { connect } from 'react-redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { IStore } from '../../../store/store.interface';
import { Categories } from './categories.component';
import { ICategoriesProps } from './categories.props.interface';

const mapStateToProps = (
  state: IStore,
  { categoryFilter }: Pick<ICategoriesProps, 'categoryFilter'>
): Pick<ICategoriesProps, 'categories'> => {
  const categories = CategorySelectors.selectCategories(state);

  const filteredCategories =
    categoryFilter && categoryFilter.length > 0
      ? categories.filter(c => c.name.toLowerCase().indexOf(categoryFilter.toLowerCase()) >= 0)
      : categories;

  return {
    categories: filteredCategories,
  };
};

export const CategoriesContainer = connect(mapStateToProps)(Categories);
