import { Pane, Text, SmallCrossIcon, Popover } from 'evergreen-ui';
import * as React from 'react';
import { ICategoryTagProps } from './category-tag.props.interface';
import './category-tag.css';

export const CategoryTag = ({ category, onClear }: ICategoryTagProps) => {
  return (
    <Pane display='inline-block'>
      <Pane
        data-name='category-tag'
        display='flex'
        alignItems='center'
        background={category?.color || '#333'}
        padding={5}
        paddingRight={5}
        paddingLeft={10}
        borderRadius={3}
      >
        {/* Clickable to see the category name if it is particularly long */}
        {/* TODO pane is hardcoded to new theme background color. Custom theme possible? */}
        <Popover
          minWidth='unset'
          content={() => (
            <Pane
              background='#474d66'
              minHeight='unset'
              paddingLeft='15px'
              paddingRight='15px'
              paddingBottom='10px'
              paddingTop='8px'
              textAlign='center'
            >
              <Text color='white'>{category?.name}</Text>
            </Pane>
          )}
        >
          <Text
            color='white'
            maxWidth='128px'
            overflow='hidden'
            textOverflow='ellipsis'
            paddingRight={onClear ? 10 : 5}
            onClick={close}
          >
            {category?.name}
          </Text>
        </Popover>

        {onClear && (
          <button type='button' onClick={onClear} className='category_tag_button'>
            <SmallCrossIcon color='white' />
          </button>
        )}
      </Pane>
    </Pane>
  );
};
