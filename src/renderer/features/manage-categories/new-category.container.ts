import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NewCategory } from './new-category.component';
import { INewCategoryProps } from './new-category.component.interface';
import { SaveNewCategory } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';

const mapDispatchToProps = (dispatch: Dispatch): INewCategoryProps => ({
  saveNewCategory: (category: ICategory) => dispatch(SaveNewCategory(category)),
});

export const NewCategoryContainer = connect(null, mapDispatchToProps)(NewCategory);
