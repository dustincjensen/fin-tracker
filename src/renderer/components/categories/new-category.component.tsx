import * as React from 'react';
import { INewCategoryState } from './new-category.state';
import { INewCategoryProps } from './new-category.props';

import './new-category.component.scss';

export default class NewCategory extends React.Component<INewCategoryProps, INewCategoryState> {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  // TODO do this better?
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
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const newCategory = {
      ...this.state,
      id: this.getGuid()
    };

    this.props.saveNewCategory(newCategory);
    this.setState({ name: '' });
  };

  // TODO move somewhere else.
  getGuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
