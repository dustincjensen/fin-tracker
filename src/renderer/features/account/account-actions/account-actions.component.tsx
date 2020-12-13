import { majorScale, Button, Pane } from 'evergreen-ui';
import * as React from 'react';
import { AddNewRecordDialog } from '../add-new-record/add-new-record.dialog';
import { IAccountActionsProps } from './account-actions.props.interface';

export const AccountActions = ({ accountId }: IAccountActionsProps) => {
  const [addNewRecordIsShown, setAddNewRecordIsShown] = React.useState(false);

  return (
    <Pane display='flex' justifyContent='flex-end' marginBottom={majorScale(1)}>
      <Button
        appearance='primary'
        intent='success'
        iconBefore='add'
        height={majorScale(5)}
        onClick={() => setAddNewRecordIsShown(true)}
      >
        Add New Transaction
      </Button>

      <AddNewRecordDialog
        accountId={accountId}
        isShown={addNewRecordIsShown}
        onClose={() => setAddNewRecordIsShown(false)}
      />
    </Pane>
  );
};
