import { Pane, SearchInput, majorScale } from 'evergreen-ui';
import * as React from 'react';
import { IAutoCategoriesFilterProps } from './auto-categories-filter.props.interface';

export const AutoCategoriesFilter = ({ autoCategoryFilter, setAutoCategoryFilter }: IAutoCategoriesFilterProps) => {
  const onChange = evt => setAutoCategoryFilter(evt.target.value);

  return (
    <Pane>
      <SearchInput
        placeholder='Filter Auto Categories'
        height={majorScale(5)}
        value={autoCategoryFilter}
        width='100%'
        onChange={onChange}
      />
    </Pane>
  );
};
