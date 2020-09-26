import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../../store/category/category.actions';
import { ICategory } from '../../../store/category/category.interface';
import { EditCategory } from './edit-category.component';
import { IEditCategoryProps } from './edit-category.props.interface';

type StateProps = Pick<IEditCategoryProps, 'saveButtonText'>;
type DispatchProps = Pick<IEditCategoryProps, 'saveCategory'>;

const mapStateToProps = (): StateProps => ({
  saveButtonText: 'Update Category',
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveCategory: (category: ICategory) => dispatch(CategoryActions.updateCategory(category)),
});

export const EditCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(EditCategory);
