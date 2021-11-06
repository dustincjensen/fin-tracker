import { majorScale, Button, Pane, AddIcon } from 'evergreen-ui';
import * as React from 'react';
import { AddNewRecordDialog } from '../add-new-record/add-new-record.dialog';
import { IAccountActionsProps } from './account-actions.props.interface';
import { SelectCategory } from './select-category.component';

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