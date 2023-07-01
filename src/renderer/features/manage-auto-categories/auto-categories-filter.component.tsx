import { Pane, SearchInput, majorScale, Checkbox } from 'evergreen-ui';
import React from 'react';

type AutoCategoriesFilterProps = {
  /**
   * The auto category filter.
   */
  autoCategoryFilter: string;

  /**
   * A function to set the current filter value.
   */
  setAutoCategoryFilter: (search: string) => void;

  /**
   * True if archived accounts should be shown, false otherwise.
   */
  showArchived: boolean;

  /**
   * A function to toggle show archived.
   */
  toggleShowArchived: () => void;
};

export const AutoCategoriesFilter = ({
  autoCategoryFilter,
  setAutoCategoryFilter,
  showArchived,
  toggleShowArchived,
}: AutoCategoriesFilterProps) => {
  // TODO callbacks...
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
