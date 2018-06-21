import * as React from 'react';
import { INewCategoryProps, INewCategoryState } from './new-category.interface';
import { newGuid } from '../../utils/guid.util';
import './new-category.component.scss';

export class NewCategory extends React.Component<INewCategoryProps, INewCategoryState> {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    return (
      <div className="new-category-background">
        <div className="new-category-header">New Category</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-layout">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required />
          </div>
          <div className="new-category-footer">
            <button className="btn btn-primary btn-lg">Save</button>
          </div>
        </form>
      </div>
    );
  }

  handleChange = (evt) => {
    const { target } = evt;
    const { value } = target;
    this.setState({ name: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const newCategory = {
      ...this.state,
      id: newGuid()
    };

    this.props.saveNewCategory(newCategory);
    this.setState({ name: '' });
  };
}
