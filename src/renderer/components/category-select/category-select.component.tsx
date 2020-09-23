import { Button, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import * as React from 'react';
import { createSelector } from 'reselect';
import { ICategory } from '../../store/category/category.interface';
import { CategoryTag } from '../category-tag/category-tag.component';
import { ICategorySelectProps } from './category-select.props.interface';

const selectOptions = createSelector(
  (categories: ICategory[]) => categories,
  categories => categories.map(category => ({ label: category.name, value: category.id }))
);

export const CategorySelect = ({ record, categories, updateCategory, disabled }: ICategorySelectProps) => {
  // TODO clean up reducer?
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      if (action.type === 'SET_CATEGORY_ID') {
        return {
          ...state,
          categoryId: action.payload,
        };
      } else if (action.type === 'SET_MENU_OPEN') {
        return {
          ...state,
          menuOpen: action.payload,
        };
      }
      return state;
    },
    {
      categoryId: undefined,
      menuOpen: false,
    }
  );

  const options = selectOptions(categories);

  React.useEffect(() => {
    // Don't update the category until the category id is set
    // and the menu is closed.
    if (!state.menuOpen && state.categoryId) {
      updateCategory(record.id, state.categoryId);
    }
  }, [state.menuOpen, state.categoryId]);

  const onSelect = (item: SelectMenuItem) => dispatch({ type: 'SET_CATEGORY_ID', payload: item.value as string });
  const onSelectMenuOpened = () => dispatch({ type: 'SET_MENU_OPEN', payload: true });
  const onSelectMenuClosed = () => dispatch({ type: 'SET_MENU_OPEN', payload: false });
  const onClear = () => {
    dispatch({ type: 'SET_CATEGORY_ID', payload: undefined });
    updateCategory(record.id, undefined);
  };

  if (record?.category) {
    return <CategoryTag category={record.category} onClear={onClear} />;
  }

  return (
    <SelectMenu
      title='Category'
      options={options}
      selected={state.categoryId}
      onSelect={onSelect}
      onOpen={onSelectMenuOpened}
      onClose={onSelectMenuClosed}
      closeOnSelect
    >
      <Button type='button' disabled={disabled}>
        Select category...
      </Button>
    </SelectMenu>
  );
};
