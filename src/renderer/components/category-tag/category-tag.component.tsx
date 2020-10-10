import { Pane, Text, Button, Icon, minorScale } from 'evergreen-ui';
import * as React from 'react';
import { ICategoryTagProps } from './category-tag.props.interface';

export const CategoryTag = ({ category, onClear }: ICategoryTagProps) => {
  return (
    <Pane display='inline-block'>
      <Pane
        data-name='category-tag'
        display='flex'
        alignItems='center'
        background={category.color || '#333'}
        padding={5}
        paddingRight={5}
        paddingLeft={10}
        borderRadius={3}
      >
        <Text color='white' paddingRight={onClear ? 10 : 5}>
          {category.name}
        </Text>
        {onClear && (
          <Button type='button' height={minorScale(4)} padding={0} margin={0} appearance='minimal' onClick={onClear}>
            <Icon icon='small-cross' color='white' />
          </Button>
        )}
      </Pane>
    </Pane>
  );
};
