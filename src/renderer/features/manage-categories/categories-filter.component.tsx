import { Pane, SearchInput, Button, majorScale } from 'evergreen-ui';
import * as React from 'react';
import { ICategoriesFilterProps } from './categories-filter.props.interface';

export const CategoriesFilter: React.FC<ICategoriesFilterProps> = props => {
  const { categoryFilter, setCategoryFilter, openNewCategory } = props;

  const onChange = evt => setCategoryFilter(evt.target.value);

  return (
    <Pane display='flex'>
      <Button
        appearance='primary'
        intent='success'
        iconBefore='plus'
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
