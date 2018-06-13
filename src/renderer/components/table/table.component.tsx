import * as React from 'react';
import { ITableStateProps, ITableDispatchProps, IHeaderDefinition, TableKeyType, IActionDefinition } from './table.props';
import './table.component.scss';

export class Table<T> extends React.Component<ITableStateProps<T> & ITableDispatchProps> {
  /**
   * Throws an error if the tableHeader and dataKeys don't match in length.
   * @param props the props for the component.
   */
  constructor(props: ITableStateProps<T> & ITableDispatchProps) {
    super(props);

    const { tableHeader, dataKeys, actions } = props;
    const dataKeyActionsLength = dataKeys.length + (actions && actions.length || 0);

    if (tableHeader.length !== dataKeyActionsLength) {
      throw new Error('Table Header and dataKeys must have the same length.');
    }
  }

  /**
   * Render the component.
   */
  render() {
    const { tableHeader, dataKeys, rowData, actions } = this.props;
    const [header, style] = this.createHeader(tableHeader);
    const rows = this.createRows(rowData, dataKeys, actions);
    return (
      <div className="table" style={style}>
        {header}
        {rows}
      </div>
    );
  }

  /**
   * Creates the header row and grid widths.
   * @param tableHeader the header definition
   */
  private createHeader(tableHeader: IHeaderDefinition[]): any[] {
    const header = tableHeader.map((h, index) => {
      const cellClass = this.getCellClass(index, tableHeader);
      return <div key={`header-${index}`} className={`${cellClass} header`}>{h.description}</div>
    });

    const style = {
      gridTemplateColumns: tableHeader.map(h => h.gridWidth).reduce((h1, h2) => `${h1} ${h2}`)
    };

    return [header, style];
  }

  /**
   * Create rows by indexing the data with the keys.
   * @param rowData the data to display
   * @param dataKeys the keys to index the data.
   */
  private createRows(rowData, dataKeys: TableKeyType<T>[], actions: IActionDefinition[]) {
    // TODO clean up this function to make it more solid.
    let rows: JSX.Element[] = [];
    if (rowData && dataKeys) {
      rows = rowData.map((record, index) => {
        const rowType = this.getRowType(index);
        const row = dataKeys.map((dataKey, keyIndex) => {
          const cellClass = actions && actions.length > 0 ? 'cell' : this.getCellClass(keyIndex, dataKeys);
          const cellValue = dataKey === 'rowNumber' ? index + 1 : record[dataKey];
          return <div key={`data-${index}-${keyIndex}`} className={`${cellClass} ${rowType}`}>{cellValue}</div>;
        });

        if (actions) {
          const mappedActions = actions.map((a, actionIndex) => {
            switch (a.type) {
              case 'button':
                return (
                  // TODO change this to be dynamic for any number of actions.
                  // It won't always be last-cell
                  <div key={`action-${index}-${actionIndex}`} className={`last-cell ${rowType}`}>
                    <button
                      className={a.classes}
                      onClick={() => a.event(record)}>
                      {a.text}
                    </button>
                  </div>
                );
            }
          });
          row.push(...mappedActions);
        }

        return row;
      });
    }
    return rows;
  };

  /**
   * Returns 'cell' or 'last-cell'
   * @param index the index of the cell
   * @param arr the array of cells
   */
  private getCellClass(index: number, arr: any): 'cell' | 'last-cell' {
    return index !== arr.length - 1 ? 'cell' : 'last-cell';
  };

  /**
   * Returns 'even-row' or 'odd-row'
   * @param index the index of the row.
   */
  private getRowType(index: number): 'even-row' | 'odd-row' {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  }
}
