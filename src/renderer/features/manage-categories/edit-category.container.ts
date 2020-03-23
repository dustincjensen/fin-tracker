import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../store/category/category.actions';
import { ICategory } from '../../store/category/category.interface';
import { EditCategory } from './edit-category.component';
import { IEditCategoryDispatchProps, IEditCategoryStateProps } from './edit-category.props.interface';

const mapStateToProps = (): IEditCategoryStateProps => ({
  saveButtonText: 'Update Category',
});

const mapDispatchToProps = (dispatch: Dispatch): IEditCategoryDispatchProps => ({
  saveCategory: (category: ICategory) => dispatch(CategoryActions.updateCategory(category)),
});

export const EditCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(EditCategory);
