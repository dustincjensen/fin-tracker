import { Button, majorScale, Pane, FormField, Text, CrossIcon, TickIcon } from 'evergreen-ui';
import * as React from 'react';
import { accountTypeLabels } from '../../../utils/account.utils';
import { IActionPendingRecordsProps } from './action-pending-records.props.interface';

export const ActionPendingRecords = ({
  accountName,
  accountType,
  fileName,
  startingBalance,
  newRecords,
  existingRecords,
  accept,
  clear,
}: IActionPendingRecordsProps) => {
  return (
    <Pane>
      <Pane display='flex' justifyContent='space-between' border padding={20} background='tint1' borderRadius={5}>
        <Pane>
          <Pane display='flex'>
            <FormField label='Account Name' marginBottom={majorScale(3)} minWidth={200} width='100%'>
              <Text>{accountName}</Text>
            </FormField>
            <FormField label='Account Type' marginBottom={majorScale(3)} minWidth={200} width='100%'>
              <Text>{accountTypeLabels[accountType]}</Text>
            </FormField>
          </Pane>
          <FormField label='Imported File'>
            <Text>{fileName}</Text>
          </FormField>
        </Pane>
        <Pane display='flex' flexDirection='column' justifyContent='space-around'>
          <Button
            appearance='primary'
            intent='success'
            iconBefore={TickIcon}
            height={majorScale(5)}
            marginBottom={20}
            onClick={() => accept(startingBalance, newRecords, existingRecords)}
          >
            Accept Records
          </Button>
          <Button appearance='primary' intent='danger' iconBefore={CrossIcon} height={majorScale(5)} onClick={clear}>
            Clear Records
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};
