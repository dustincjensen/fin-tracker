import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { NewCategory } from './new-category.component';
import { INewCategoryDispatchProps } from './new-category.props.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewCategoryDispatchProps => ({
  saveNewCategory: (category: ICategory) => dispatch(CategoryActions.saveNewCategory(category)),
});

export const NewCategoryContainer = connect(null, mapDispatchToProps)(NewCategory);
