import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { ICategory } from '../../store/category/category.interface';
import { DeleteCategory } from '../../store/category/category.actions';
import { ICategoriesStateProps, ICategoriesDispatchProps } from './categories.props.interface';
import { Categories } from './categories.component';
import { Dispatch } from 'redux';

const mapStateToProps = (state: IStore): ICategoriesStateProps => {
  const categories: ICategory[] = Object.keys(state.categories).map(key => {
    return state.categories[key];
  });

  return {
    categories
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICategoriesDispatchProps => ({
  deleteCategory: (categoryId: string) => dispatch(DeleteCategory(categoryId))
});

export const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Categories);
