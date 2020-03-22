import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { IStore } from '../../store/store.interface';
import { Categories } from './categories.component';
import { ICategoriesDispatchProps, ICategoriesStateProps, ICategoriesOwnProps } from './categories.props.interface';

const mapStateToProps = (state: IStore, ownProps: ICategoriesOwnProps): ICategoriesStateProps => {
  const { categoryFilter } = ownProps;

  const categories: ICategory[] = Object.keys(state.categories.categories)
    .map(key => state.categories.categories[key])
    .sort((c1, c2) => (c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0));

  const filteredCategories =
    categoryFilter && categoryFilter.length > 0
      ? categories.filter(c => c.name.toLowerCase().indexOf(categoryFilter.toLowerCase()) >= 0)
      : categories;

  return {
    categories: filteredCategories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICategoriesDispatchProps => ({
  deleteCategory: (categoryId: string) => dispatch(CategoryActions.deleteCategory(categoryId)),
});

export const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Categories);
