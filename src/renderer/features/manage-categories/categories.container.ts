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
    .sort((c1, c2) => {
      const c1Name = c1.name.toLowerCase();
      const c2Name = c2.name.toLowerCase();
      return c1Name < c2Name ? -1 : c1Name > c2Name ? 1 : 0;
    });

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
