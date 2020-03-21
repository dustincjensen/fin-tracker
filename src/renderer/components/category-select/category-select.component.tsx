import { Pane, Text, Button, Icon, minorScale, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import * as React from 'react';
import { ICategorySelectProps } from './category-select.props.interface';

export const CategorySelect: React.FC<ICategorySelectProps> = props => {
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

  const { record, categories, updateCategory } = props;

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
    return (
      <Pane display='inline-block'>
        <Pane
          display='flex'
          alignItems='center'
          background='orangered'
          padding={5}
          paddingRight={5}
          paddingLeft={10}
          borderRadius={3}
        >
          <Text color='white' paddingRight={10}>
            {record.category.label}
          </Text>
          <Button height={minorScale(4)} padding={0} margin={0} appearance='minimal' onClick={onClear}>
            <Icon icon='small-cross' color='white' />
          </Button>
        </Pane>
      </Pane>
    );
  }

  return (
    <SelectMenu
      title='Category'
      options={categories}
      selected={state.categoryId}
      onSelect={onSelect}
      onOpen={onSelectMenuOpened}
      onClose={onSelectMenuClosed}
      closeOnSelect
    >
      <Button>Select category...</Button>
    </SelectMenu>
  );
};
