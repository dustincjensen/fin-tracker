import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { CategorySelectors } from '../../store/category/category.selectors';
import { IStore } from '../../store/store.interface';
import { Categories } from './categories.component';
import { ICategoriesDispatchProps, ICategoriesStateProps, ICategoriesOwnProps } from './categories.props.interface';

const mapStateToProps = (state: IStore, ownProps: ICategoriesOwnProps): ICategoriesStateProps => {
  const { categoryFilter } = ownProps;

  const categories = CategorySelectors.selectCategories(state);

  const filteredCategories =
    categoryFilter && categoryFilter.length > 0
      ? categories.filter(c => c.name.toLowerCase().indexOf(categoryFilter.toLowerCase()) >= 0)
      : categories;

  return {
    categories: filteredCategories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICategoriesDispatchProps => ({
  deleteCategory: (category: ICategory) => dispatch(CategoryActions.deleteCategory(category)),
});

export const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Categories);
