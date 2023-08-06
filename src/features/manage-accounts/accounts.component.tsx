import { Table, Tooltip, IconButton, Pane, ArchiveIcon, EditIcon, TrashIcon } from 'evergreen-ui';
import React from 'react';
import { useAccounts } from '../../hooks/accounts/use-accounts.hook';
import { Account } from '../../models/account.type';
import { accountTypeLabels } from '../../utils/account.utils';
import { DeleteAccountDialog } from './delete-account.dialog';
import { EditAccountContainer } from './edit-account/edit-account.container';

export const Accounts = () => {
    const { accounts } = useAccounts();

    const [accountToDelete, setAccountToDelete] = React.useState<Account | null>(null);
    const [isEditing, setIsEditing] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        // If the record we are editing is removed from the list
        // of accounts we are displaying, either by deletion, or
        // by filtering, unset the editing flag.
        if (isEditing && !accounts.find(c => c.id === isEditing)) {
            setIsEditing(undefined);
        }
    }, [accounts, isEditing]);

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
                                <Table.TextCell>
                                    <Pane display='flex' alignItems='center'>
                                        {account.archived && (
                                            <Tooltip content='Archived'>
                                                <ArchiveIcon marginTop={3} marginRight={10} />
                                            </Tooltip>
                                        )}
                                        {account.name}
                                    </Pane>
                                </Table.TextCell>
                                <Table.TextCell>
                                    {account.accountType && accountTypeLabels[account.accountType]}
                                </Table.TextCell>
                                <Table.Cell flex='none' justifyContent='flex-end' width={100}>
                                    <Tooltip content='Edit Account'>
                                        <IconButton
                                            icon={EditIcon}
                                            appearance='minimal'
                                            disabled={isEditing && isEditing !== account.id}
                                            onClick={() => setIsEditing(account.id)}
                                            marginRight={5}
                                        />
                                    </Tooltip>
                                    <Tooltip content='Delete Account'>
                                        <IconButton
                                            icon={TrashIcon}
                                            appearance='minimal'
                                            intent='danger'
                                            onClick={() => setAccountToDelete(account)}
                                        />
                                    </Tooltip>
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

            <DeleteAccountDialog account={accountToDelete} onClose={() => setAccountToDelete(null)} />
        </Table>
    );
};
