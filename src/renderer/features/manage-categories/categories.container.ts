import { connect, Dispatch } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { ICategory } from '../../store/category/category.interface';
import { DeleteCategory } from '../../store/category/category.actions';
import { Table } from '../../components/table/table.component';
import { ITableStateProps, ITableDispatchProps } from '../../components/table/table.interface';

const mapStateToProps = (state: IStore): ITableStateProps<ICategory> => {
  return {
    tableHeader: [
      { description: '', gridWidth: 'auto' },
      { description: 'Name', gridWidth: 'minmax(100px, 1fr)' },
      { description: '', gridWidth: 'auto' }
    ],
    dataKeys: [
      'rowNumber', 'name'
    ],
    rowData: state.categories
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ITableDispatchProps => {
  return {
    actions: [
      {
        type: 'button',
        text: 'Delete',
        classes: 'btn btn-danger btn-sm',
        event: (category: ICategory) => dispatch(DeleteCategory(category.id))
      }
    ]
  };
}

export const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Table);
