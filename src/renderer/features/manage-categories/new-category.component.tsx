import {
  Button,
  Heading,
  Icon,
  majorScale,
  Pane,
  TextInputField,
  FormFieldLabel,
  FormFieldDescription,
  Popover,
} from 'evergreen-ui';
import * as React from 'react';
import { CirclePicker } from 'react-color';
import { newGuid } from '../../utils/guid.util';
import { INewCategoryProps } from './new-category.component.interface';
import { INewCategoryState } from './new-category.state.interface';

export class NewCategory extends React.Component<INewCategoryProps, INewCategoryState> {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '' };
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
            <Pane marginBottom={majorScale(3)}>
              <FormFieldLabel>Color *</FormFieldLabel>
              <FormFieldDescription>
                Color will be used when displaying the category on records and in graphs.
              </FormFieldDescription>
              <Popover
                content={
                  <Pane padding={20}>
                    <CirclePicker onChange={this.handleColorChange} />
                  </Pane>
                }
              >
                <Button
                  type='button'
                  width={200}
                  height={majorScale(5)}
                  display='flex'
                  justifyContent='space-between'
                  paddingRight={10}
                >
                  {this.state.color || 'Select Color...'}
                  <div
                    style={{ border: '1px solid black', background: this.state.color, width: '40px', height: '26px' }}
                  >
                    <input
                      defaultValue={this.state.color}
                      required
                      style={{ width: '1px', height: '1px', opacity: 0 }}
                    />
                  </div>
                </Button>
              </Popover>
            </Pane>
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

  handleChange = evt => this.setState({ name: evt.target.value });

  handleColorChange = color => this.setState({ color: color.hex });

  handleSubmit = evt => {
    evt.preventDefault();

    const newCategory = {
      ...this.state,
      id: newGuid(),
    };

    this.props.saveNewCategory(newCategory);
    this.setState({ name: '', color: '' });
  };
}
