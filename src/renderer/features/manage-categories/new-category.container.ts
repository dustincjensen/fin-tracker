import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SaveNewCategory } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { NewCategory } from './new-category.component';
import { INewCategoryDispatchProps } from './new-category.component.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewCategoryDispatchProps => ({
  saveNewCategory: (category: ICategory) => dispatch(SaveNewCategory(category)),
});

export const NewCategoryContainer = connect(null, mapDispatchToProps)(NewCategory);
