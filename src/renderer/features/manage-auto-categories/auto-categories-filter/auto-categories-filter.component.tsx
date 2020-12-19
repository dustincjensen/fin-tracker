import { Pane, SearchInput, majorScale, Checkbox } from 'evergreen-ui';
import * as React from 'react';
import { IAutoCategoriesFilterProps } from './auto-categories-filter.props.interface';

export const AutoCategoriesFilter = ({
  autoCategoryFilter,
  setAutoCategoryFilter,
  showArchived,
  toggleShowArchived,
}: IAutoCategoriesFilterProps) => {
  const onChange = evt => setAutoCategoryFilter(evt.target.value);
  const onArchivedChange = () => toggleShowArchived();

  return (
    <Pane display='grid' gridTemplateColumns='1fr auto' alignItems='center'>
      <SearchInput
        placeholder='Filter Auto Categories'
        height={majorScale(5)}
        value={autoCategoryFilter}
        onChange={onChange}
        paddingRight={15}
        width='100%'
      />
      <Checkbox label='Show archived?' checked={showArchived} onChange={onArchivedChange} margin={0} />
    </Pane>
  );
};
