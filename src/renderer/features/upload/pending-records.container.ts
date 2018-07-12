import { connect, Dispatch } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { IRecord } from '../../store/records/record.interface';
import { Table } from '../../components/table/table.component';
import { ITableStateProps, ITableDispatchProps } from '../../components/table/table.component.interface';

const mapStateToProps = (state: IStore): ITableStateProps<IRecord> => {
    return {
        tableHeader: [
            { description: '', gridWidth: 'auto' },
            { description: 'Date', gridWidth: 'auto' },
            { description: 'Description', gridWidth: 'minmax(100px, 1fr)' },
            { description: 'Debit', gridWidth: 'auto' },
            { description: 'Credit', gridWidth: 'auto' }
        ],
        dataKeys: [
            'rowNumber', 'date', 'description', 'debit', 'credit'
        ],
        rowData: state.pendingRecords.records
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ITableDispatchProps => {
    return {
        actions: [
            //   {
            //     type: 'button',
            //     text: 'Delete',
            //     classes: 'btn btn-danger btn-sm',
            //     event: (category: IRecord) => dispatch(DeleteCategory(category.id))
            //   }
        ]
    };
}

export const PendingRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(Table);
