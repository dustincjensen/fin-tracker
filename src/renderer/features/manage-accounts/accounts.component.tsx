import { Table, Tooltip, IconButton, Pane } from 'evergreen-ui';
import * as React from 'react';
import { IAccount } from '../../store/account/account.interface';
import { IAccountProps } from './accounts.props.interface';
import { DeleteAccountDialog } from './delete-account.dialog';
import { EditAccountContainer } from './edit-account.container';

export const Accounts: React.FC<IAccountProps> = props => {
  const { deleteAccount } = props;
  const [accountToDelete, setAccountToDelete] = React.useState<IAccount>(null);
  const [isEditing, setIsEditing] = React.useState<string>(undefined);

  return (
    <Table>
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.HeaderCell flex='none' width={100}></Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {props.accounts.map(account => {
          return (
            <Pane key={account.id}>
              <Table.Row>
                <Table.TextCell>{account.name}</Table.TextCell>
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
