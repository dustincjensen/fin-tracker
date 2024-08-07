import { Pane, SelectMenu, Button, IconButton, CrossIcon, majorScale, SelectMenuItem } from 'evergreen-ui';
import React from 'react';
import { useCategories } from '../../hooks/categories/use-categories.hook';

// TODO props type

export const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
    const { categories } = useCategories();
    const categoryOptions = [
        { label: 'Uncategorized', value: 'Uncategorized' },
        ...categories.map(c => ({ label: c.name, value: c.id })),
    ];
    const [name, setName] = React.useState<string>('');

    const onSelect = (item: SelectMenuItem) => {
        setName(item.label);
        setSelectedCategory(item.value);
    };
    const clearSelectedCategory = () => {
        setName('');
        setSelectedCategory(undefined);
    };

    return (
        <Pane display='flex' alignItems='center' justifyContent='flex-end'>
            <SelectMenu
                title='Select Category Filter'
                options={categoryOptions}
                selected={selectedCategory}
                onSelect={onSelect}
            >
                <Button minWidth={150} marginRight={3} height={majorScale(5)}>
                    {name || 'Filter by Category'}
                </Button>
            </SelectMenu>
            <IconButton icon={CrossIcon} onClick={clearSelectedCategory} height={majorScale(5)} />
        </Pane>
    );
};
