import { Pane, SelectMenu, Button, IconButton, CrossIcon, majorScale } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { CategorySelectors } from '../../../store/category/category.selectors';

export const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const categories = useSelector(CategorySelectors.selectCategories);
  const categoryOptions = [{ label: 'Uncategorized', value: 'Uncategorized' }, ...categories.map(c => ({ label: c.name, value: c.id }))];
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
      <IconButton icon={CrossIcon} onClick={clearSelectedCategory} height={majorScale(5)}/>
    </Pane>
  );
};