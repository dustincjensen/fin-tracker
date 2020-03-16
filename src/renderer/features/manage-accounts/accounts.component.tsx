import * as React from 'react';
import { Table, Button } from "evergreen-ui";
import { IAccount } from "../../store/account/account.interface";
import { DeleteAccountDialog } from './delete-account.dialog';
import { IAccountProps } from './accounts.props.interface';

export const Accounts: React.FC<IAccountProps> = props => {
    const { deleteAccount } = props;
    const [accountToDelete, setAccountToDelete] = React.useState<IAccount>(null);

    return (
        <Table>
            <Table.Head>
                <Table.TextHeaderCell>
                    Name
                </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {props.accounts.map(account => {
                   return (<Table.Row key={account.id}>
                        <Table.TextCell>{account.name}</Table.TextCell>
                        <Table.Cell flex='none'>
                            <Button appearance="minimal" intent="danger" onClick={() => setAccountToDelete(account)}>
                                Delete
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                   );
                })}
            </Table.Body>

            <DeleteAccountDialog 
                account={accountToDelete} 
                onClose={() => setAccountToDelete(null)}
                onConfirm={() => setAccountToDelete(null)}
                deleteAccount={deleteAccount} />
        </Table>
    );
};



