import { Table, Tooltip, IconButton, Pane } from 'evergreen-ui';
import * as React from 'react';
import { IAccount } from '../../store/account/account.interface';
import { accountTypeLabels } from '../../utils/account.utils';
import { IAccountProps } from './accounts.props.interface';
import { DeleteAccountDialog } from './delete-account.dialog';
import { EditAccountContainer } from './edit-account.container';

export const Accounts: React.FC<IAccountProps> = props => {
  const { accounts, deleteAccount } = props;
  const [accountToDelete, setAccountToDelete] = React.useState<IAccount>(null);
  const [isEditing, setIsEditing] = React.useState<string>(undefined);

  React.useEffect(() => {
    // If the record we are editing is removed from the list
    // of accounts we are displaying, either by deletion, or
    // by filtering, unset the editing flag.
    if (isEditing && !accounts.find(c => c.id === isEditing)) {
      setIsEditing(undefined);
    }
  }, [accounts]);

  return (
    <Table>
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Account Type</Table.TextHeaderCell>
        <Table.HeaderCell flex='none' width={100}></Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {accounts.map(account => {
          return (
            <Pane key={account.id}>
              <Table.Row>
                <Table.TextCell>{account.name}</Table.TextCell>
                <Table.TextCell>{account.accountType && accountTypeLabels[account.accountType]}</Table.TextCell>
                <Table.Cell flex='none' justifyContent='flex-end' width={100}>
                  <Tooltip content='Edit Account' hideDelay={0}>
                    <IconButton
                      icon='edit'
                      appearance='minimal'
                      disabled={isEditing && isEditing !== account.id}
                      onClick={() => setIsEditing(account.id)}
                      marginRight={5}
                    />
                  </Tooltip>
                  <Tooltip content='Delete Account' hideDelay={0}>
                    <IconButton
                      icon='trash'
                      appearance='minimal'
                      intent='danger'
                      onClick={() => setAccountToDelete(account)}
                    />
                  </Tooltip>

                  {/* Use this is window width is too small? */}
                  {/* <Popover position={Position.BOTTOM_RIGHT} content={({close}) => (
                      <Menu>
                        <Menu.Group>
                          <Menu.Item icon="edit" onSelect={() => {
                            setIsEditing(category.id);
                            close();
                          }}>Edit</Menu.Item>
                        </Menu.Group>
                        <Menu.Divider />
                        <Menu.Group>
                          <Menu.Item icon="trash" intent="danger" onSelect={
                            () => {setCategoryToDelete(category); close();}
                            }>
                            Delete
                          </Menu.Item>
                        </Menu.Group>
                      </Menu>
                    )}>
                      <Tooltip content="Options" hideDelay={0}>
                      <IconButton icon='more' appearance="minimal" />
                      </Tooltip>
                    </Popover> */}
                </Table.Cell>
              </Table.Row>
              {isEditing === account.id && (
                <Pane background='tint1' borderLeft borderRight borderBottom>
                  <EditAccountContainer account={account} close={() => setIsEditing(undefined)} />
                </Pane>
              )}
            </Pane>
          );
        })}
      </Table.Body>

      <DeleteAccountDialog
        account={accountToDelete}
        onClose={() => setAccountToDelete(null)}
        onConfirm={() => setAccountToDelete(null)}
        deleteAccount={deleteAccount}
      />
    </Table>
  );
};
