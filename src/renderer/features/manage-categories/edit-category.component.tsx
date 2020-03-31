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
import { ICategory } from '../../store/category/category.interface';
import { newGuid } from '../../utils/guid.util';
import { IEditCategoryProps } from './edit-category.props.interface';

export const EditCategory: React.FC<IEditCategoryProps> = ({
  close,
  saveCategory,
  saveButtonText,
  headerText,
  category,
}) => {
  const [name, setName] = React.useState<string>(category?.name || '');
  const [color, setColor] = React.useState<string>(category?.color || '');

  const handleNameChange = evt => setName(evt.target.value);
  const handleColorChange = color => setColor(color.hex);

  const handleSubmit = evt => {
    evt.preventDefault();

    const updatedCategory: ICategory = {
      id: category?.id || newGuid(),
      name,
      color,
    };

    saveCategory(updatedCategory);
    close();
  };

  return (
    <Pane padding={20} background='tint1' border={!category} borderRadius={!category ? 5 : 0}>
      {headerText && (
        <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
          <Icon icon='group-objects' size={25} marginRight={10} color='default' />
          <Heading size={700}>{headerText}</Heading>
        </Pane>
      )}

      <form onSubmit={handleSubmit}>
        <Pane>
          <TextInputField
            width={350}
            label='Name'
            value={name}
            onChange={handleNameChange}
            required
            //isInvalid={name === ''}
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
                  <CirclePicker onChange={handleColorChange} />
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
                {color || 'Select Color...'}
                <div style={{ border: '1px solid black', background: color, width: '40px', height: '26px' }}>
                  <input
                    tabIndex={-1}
                    defaultValue={color}
                    required
                    style={{ width: '1px', height: '1px', opacity: 0 }}
                  />
                </div>
              </Button>
            </Popover>
          </Pane>
        </Pane>
        <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={10}>
          <Button type='button' iconBefore='ban-circle' height={majorScale(5)} marginRight={10} onClick={close}>
            Cancel
          </Button>
          <Button appearance='primary' iconBefore='floppy-disk' height={majorScale(5)}>
            {saveButtonText}
          </Button>
        </Pane>
      </form>
    </Pane>
  );
};