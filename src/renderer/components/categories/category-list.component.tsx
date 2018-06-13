import * as React from 'react';
import { ICategoryListProps } from './category-list.props';

import './category-list.component.scss';

export default class CategoryList extends React.Component<ICategoryListProps> {
  render() {
    let rows = [];

    if (this.props.categories) {
      this.props.categories.forEach((category, index) => {
        const rowType = index % 2 === 0 ? 'even-row' : 'odd-row';
        rows.push(
          <div className={`cell ${rowType}`}>{index + 1}</div>,
          <div className={`cell ${rowType}`}>{category.name}</div>,
          <div className={`last-cell ${rowType}`}>
            <button
              className="btn btn-danger"
              onClick={() => this.props.delete(category.id)}>
              Delete
            </button>
          </div>
        );
      });
    }

    return (
      <div className="category-table">
        <div className="cell header"></div>
        <div className="cell header">Name</div>
        <div className="last-cell header"></div>
        {rows}
      </div>
    );
  }
}
