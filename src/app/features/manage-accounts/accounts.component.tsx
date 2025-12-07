import {
    Table,
    Tooltip,
    IconButton,
    Pane,
    ArchiveIcon,
    EditIcon,
    TrashIcon,
    ChevronUpIcon,
    ChevronDownIcon,
} from 'evergreen-ui';
import React from 'react';
import { Account } from '../../models/account.type';
import { accountTypeLabels } from '../../utils/account.utils';
import { DeleteAccountDialog } from './delete-account.dialog';
import { EditAccountContainer } from './edit-account.container';

type AccountsProps = {
    /**
     * Whether the accounts are being reordered.
     */
    isReordering: boolean;

    /**
     * The list of accounts to display.
     */
    accounts: Account[];

    /**
     * The order of account IDs to display.
     */
    order: string[];

    /**
     * Function to set the order of account IDs.
     */
    setOrder: (newOrder: string[]) => void;
};

export const Accounts = ({ isReordering, accounts, order, setOrder }: AccountsProps) => {
    const [accountToDelete, setAccountToDelete] = React.useState<Account | null>(null);
    const [isEditing, setIsEditing] = React.useState<string | undefined>(undefined);

    const onMoveUp = (index: number) => {
        const newOrder = [...order];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        setOrder(newOrder);
    };

    const onMoveDown = (index: number) => {
        const newOrder = [...order];
        [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
        setOrder(newOrder);
    };

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
                {isReordering && <Table.HeaderCell flex='none' width={100}></Table.HeaderCell>}
                <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                <Table.TextHeaderCell>Account Type</Table.TextHeaderCell>
                {!isReordering && <Table.HeaderCell flex='none' width={100}></Table.HeaderCell>}
            </Table.Head>
            <Table.Body>
                {order.map((accountId, index) => {
                    const account = accounts.find(acc => acc.id === accountId);
                    if (!account) {
                        return null;
                    }

                    return (
                        <Pane key={account.id}>
                            <Table.Row>
                                {isReordering && (
                                    <Table.Cell flex='none' width={100}>
                                        <IconButton
                                            icon={ChevronUpIcon}
                                            appearance='minimal'
                                            disabled={index === 0}
                                            onClick={() => onMoveUp(index)}
                                        />
                                        <IconButton
                                            icon={ChevronDownIcon}
                                            appearance='minimal'
                                            disabled={index === accounts.length - 1}
                                            onClick={() => onMoveDown(index)}
                                        />
                                    </Table.Cell>
                                )}
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
                                {!isReordering && (
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
                                )}
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
