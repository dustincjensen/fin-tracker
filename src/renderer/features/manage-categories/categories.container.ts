import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { IStore } from '../../store/store.interface';
import { Categories } from './categories.component';
import { ICategoriesDispatchProps, ICategoriesStateProps } from './categories.props.interface';

const mapStateToProps = (state: IStore): ICategoriesStateProps => {
  const categories: ICategory[] = Object.keys(state.categories.categories).map(key => {
    return state.categories.categories[key];
  });

  return {
    categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICategoriesDispatchProps => ({
  deleteCategory: (categoryId: string) => dispatch(CategoryActions.deleteCategory(categoryId)),
});

export const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Categories);
