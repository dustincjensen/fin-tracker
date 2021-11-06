import { majorScale, Button, Pane, AddIcon, SelectMenu, IconButton, CrossIcon, SelectMenuItem } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { AddNewRecordDialog } from '../add-new-record/add-new-record.dialog';
import { IAccountActionsProps } from './account-actions.props.interface';

const AccountActionsComponent = ({ accountId, selectedCategoryId, setSelectedCategoryId }: IAccountActionsProps) => {
  const [addNewRecordIsShown, setAddNewRecordIsShown] = React.useState(false);

  const onAddNewClick = React.useCallback(() => setAddNewRecordIsShown(true), [setAddNewRecordIsShown]);
  const onAddNewRecordClose = React.useCallback(() => setAddNewRecordIsShown(false), [setAddNewRecordIsShown]);

  return (
    <Pane display='flex' justifyContent='flex-end' marginBottom={majorScale(1)}>
      <SelectCategory selectedCategory={selectedCategoryId} setSelectedCategory={setSelectedCategoryId} />
      <Button appearance='primary' intent='success' iconBefore={AddIcon} height={majorScale(5)} onClick={onAddNewClick} marginLeft='20px'>
        Add New Transaction
      </Button>

      <AddNewRecordDialog accountId={accountId} isShown={addNewRecordIsShown} onClose={onAddNewRecordClose} />
    </Pane>
  );
};

export const AccountActions = React.memo(AccountActionsComponent);


const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const categories = useSelector(CategorySelectors.selectDisplayCategories);
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