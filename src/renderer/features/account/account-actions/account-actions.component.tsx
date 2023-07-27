import { majorScale, Button, Pane, AddIcon, TextInput } from 'evergreen-ui';
import React from 'react';
import { AddNewRecordDialog } from '../add-new-record/add-new-record.dialog';
import { IAccountActionsProps } from './account-actions.props.interface';
import { SelectCategory } from './select-category.component';

const AccountActionsComponent = ({
  accountId,
  filterDescription,
  setFilterDescription,
  selectedCategoryId,
  setSelectedCategoryId,
}: IAccountActionsProps) => {
  const [addNewRecordIsShown, setAddNewRecordIsShown] = React.useState(false);

  const onAddNewClick = React.useCallback(() => setAddNewRecordIsShown(true), [setAddNewRecordIsShown]);
  const onAddNewRecordClose = React.useCallback(() => setAddNewRecordIsShown(false), [setAddNewRecordIsShown]);

  return (
    <Pane display='flex' justifyContent='flex-end' marginBottom={majorScale(1)}>
      <TextInput
        placeholder='Filter by Description'
        flex='1'
        height={majorScale(5)}
        marginRight='20px'
        value={filterDescription}
        onChange={e => setFilterDescription(e.target.value)}
      />

      <SelectCategory selectedCategory={selectedCategoryId} setSelectedCategory={setSelectedCategoryId} />

      <Button
        appearance='primary'
        intent='success'
        iconBefore={AddIcon}
        height={majorScale(5)}
        onClick={onAddNewClick}
        marginLeft='20px'
      >
        Add New Transaction
      </Button>

      <AddNewRecordDialog accountId={accountId} isShown={addNewRecordIsShown} onClose={onAddNewRecordClose} />
    </Pane>
  );
};

export const AccountActions = React.memo(AccountActionsComponent);
