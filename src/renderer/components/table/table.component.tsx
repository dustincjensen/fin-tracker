import * as React from 'react';
import { ITableStateProps, ITableDispatchProps, IHeaderDefinition, TableKeyType, IActionDefinition } from './table.interface';
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
      return <div key={`header-${index}`} className="header cell">{h.description}</div>
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
        const row = dataKeys.map((dataKey, keyIndex) => {
          const cellValue = dataKey === 'rowNumber' ? index + 1 : record[dataKey];
          return <div key={`data-${index}-${keyIndex}`} className="cell">{cellValue}</div>;
        });

        if (actions) {
          const mappedActions = actions.map((a, actionIndex) => {
            switch (a.type) {
              case 'button':
                return (
                  <div key={`action-${index}-${actionIndex}`} className="cell">
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
}
