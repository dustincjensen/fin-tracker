import { Button, Heading, Icon, majorScale, Pane, TextInputField } from 'evergreen-ui';
import * as React from 'react';
import { newGuid } from '../../utils/guid.util';
import { INewCategoryProps } from './new-category.component.interface';
import { INewCategoryState } from './new-category.state.interface';

export class NewCategory extends React.Component<INewCategoryProps, INewCategoryState> {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    return (
      <Pane border padding={20} background='tint1' borderRadius={5}>
        <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
          <Icon icon='group-objects' size={25} marginRight={10} color='default' />
          <Heading size={700}>New Category</Heading>
        </Pane>

        <form onSubmit={this.handleSubmit}>
          <Pane>
            <TextInputField
              width={350}
              label='Name'
              value={this.state.name}
              onChange={this.handleChange}
              required
              //isInvalid={this.state.name === ''}
              //validationMessage='Please enter a category name.'
            />
          </Pane>
          <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={10}>
            <Button appearance='primary' iconBefore='floppy-disk' height={majorScale(5)}>
              Save Category
            </Button>
          </Pane>
        </form>
      </Pane>
    );
  }

  handleChange = evt => {
    const { target } = evt;
    const { value } = target;
    this.setState({ name: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const newCategory = {
      ...this.state,
      id: newGuid(),
    };

    this.props.saveNewCategory(newCategory);
    this.setState({ name: '' });
  };
}
