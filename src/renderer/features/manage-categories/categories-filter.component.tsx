import { Pane, SearchInput, Button, majorScale, PlusIcon } from 'evergreen-ui';
import * as React from 'react';

export type CategoriesFilterProps = {
  /**
   * The category filter.
   */
  categoryFilter: string;

  /**
   * A function to set the current filter value.
   */
  setCategoryFilter: (search: string) => void;

  /**
   * A function when invoked will display the new category form.
   */
  openNewCategory: () => void;
};

export const CategoriesFilter = ({ categoryFilter, setCategoryFilter, openNewCategory }: CategoriesFilterProps) => {
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
