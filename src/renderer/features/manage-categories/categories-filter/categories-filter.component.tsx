import { Pane, SearchInput, Button, majorScale, PlusIcon } from 'evergreen-ui';
import * as React from 'react';
import { ICategoriesFilterProps } from './categories-filter.props.interface';

export const CategoriesFilter = ({ categoryFilter, setCategoryFilter, openNewCategory }: ICategoriesFilterProps) => {
  const onChange = evt => setCategoryFilter(evt.target.value);

  return (
    <Pane display='flex'>
      <Button
        appearance='primary'
        intent='success'
        iconBefore={PlusIcon}
        minWidth={154}
        height={majorScale(5)}
        marginRight={10}
        onClick={openNewCategory}
      >
        New Category
      </Button>
      <SearchInput
        placeholder='Filter Categories'
        height={majorScale(5)}
        value={categoryFilter}
        width='100%'
        onChange={onChange}
      />
    </Pane>
  );
};
