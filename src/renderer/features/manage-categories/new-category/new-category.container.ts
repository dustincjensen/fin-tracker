import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategoryActions } from '../../../store/category/category.actions';
import { ICategory } from '../../../store/category/category.interface';
import { EditCategory } from '../edit-category/edit-category.component';
import { IEditCategoryProps } from '../edit-category/edit-category.props.interface';

type StateProps = Pick<IEditCategoryProps, 'headerText' | 'saveButtonText'>;
type DispatchProps = Pick<IEditCategoryProps, 'saveCategory'>;

const mapStateToProps = (): StateProps => ({
  headerText: 'New Category',
  saveButtonText: 'Save Category',
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  saveCategory: (category: ICategory) => dispatch(CategoryActions.saveNewCategory(category)),
});

export const NewCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(EditCategory);
