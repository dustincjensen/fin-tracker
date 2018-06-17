import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IStore } from '../store/store.interface';
import { IAccount } from '../store/account/account.interface';
import { DeleteAccount } from '../store/account/account.actions';
import { Table } from '../components/table/table.component';
import { ITableStateProps, ITableDispatchProps } from '../components/table/table.interface';

const mapStateToProps = (state: IStore): ITableStateProps<IAccount> => {
  const accounts: IAccount[] = Object.keys(state.accounts).map(id => state.accounts[id]);

  return {
    tableHeader: [
      { description: '', gridWidth: 'auto' },
      { description: 'Name', gridWidth: 'minmax(100px, 1fr)' },
      { description: '', gridWidth: 'auto' }
    ],
    dataKeys: [
      'rowNumber', 'name'
    ],
    rowData: accounts
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ITableDispatchProps => {
  return {
    actions: [
      {
        type: 'button',
        text: 'Delete',
        classes: 'btn btn-danger btn-sm',
        event: (account: IAccount) => dispatch(DeleteAccount(account.id))
      }
    ]
  };
}

export const AccountsContainer = connect(mapStateToProps, mapDispatchToProps)(Table);
