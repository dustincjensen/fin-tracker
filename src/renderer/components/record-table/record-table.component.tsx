import * as React from 'react';
import RecordTableProps from './record-table.props';
import './record-table.component.scss';

export default class RecordTable extends React.Component<RecordTableProps> {
  render() {
    let rows = [];

    if (this.props.records) {
      this.props.records.forEach((record, index) => {
        const rowType = index % 2 === 0 ? 'even-row' : 'odd-row';
        rows.push(
          <div className={`cell ${rowType}`}>{record.date}</div>,
          <div className={`cell ${rowType}`}>{record.description}</div>,
          <div className={`cell ${rowType}`}>{record.credit}</div>,
          <div className={`last-cell ${rowType}`}>{record.debit}</div>,
        );
      });
    }

    return (
      <div className="record-table">
        <div className="cell header">Date</div>
        <div className="cell header">Description</div>
        <div className="cell header">Credit</div>
        <div className="last-cell header">Debit</div>
        {rows}
      </div>
    );
  }
}
