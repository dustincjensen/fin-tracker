import { Pane, Text, SmallCrossIcon, Popover } from 'evergreen-ui';
import React from 'react';
import { Category } from '../../models/category.type';
import './category-tag.css';

export type CategoryTagProps = {
    /**
     * The category to display.
     */
    category: Category;

    /**
     * A function to invoke when the X is clicked on the category tag.
     * If undefined, the X will not display.
     */
    onClear?: () => void;
};

export const CategoryTag = ({ category, onClear }: CategoryTagProps) => {
    return (
        <Pane data-testid='category-tag' display='inline-block'>
            <Pane
                data-testid='wrapper'
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
                    <button
                        type='button'
                        aria-label='Remove Category Tag'
                        onClick={onClear}
                        className='category_tag_button'
                    >
                        <SmallCrossIcon color='white' />
                    </button>
                )}
            </Pane>
        </Pane>
    );
};
