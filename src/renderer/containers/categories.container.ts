import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import IStore from '../store/store.interface';
import ICategory from '../store/category/category.interface';
import { DeleteCategory } from '../store/category/category.actions';
import { Table } from '../components/table/table.component';
import { ITableStateProps, ITableDispatchProps } from '../components/table/table.props';

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
        classes: 'btn btn-danger',
        event: (category: ICategory) => dispatch(DeleteCategory(category.id))
      }
    ]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// export default connect<ITableStateProps<ICategory>, ITableDispatchProps, {}>(mapStateToProps, mapDispatchToProps)
//   (Table as new (props: ITableStateProps<ICategory> & ITableDispatchProps) => Table<ICategory>);
