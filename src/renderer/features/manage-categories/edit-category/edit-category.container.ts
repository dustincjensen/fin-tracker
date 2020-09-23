import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../../store/category/category.actions';
import { ICategory } from '../../../store/category/category.interface';
import { EditCategory } from './edit-category.component';
import { IEditCategoryProps } from './edit-category.props.interface';

const mapStateToProps = (): Pick<IEditCategoryProps, 'saveButtonText'> => ({
  saveButtonText: 'Update Category',
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<IEditCategoryProps, 'saveCategory'> => ({
  saveCategory: (category: ICategory) => dispatch(CategoryActions.updateCategory(category)),
});

export const EditCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(EditCategory);
