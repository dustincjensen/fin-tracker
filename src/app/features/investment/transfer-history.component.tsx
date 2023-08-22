import { Pane, Heading, Table } from 'evergreen-ui';
import React from 'react';
import { useSelector } from 'react-redux';
import { useCategories } from '../../hooks/categories/use-categories.hook';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { createStaticWidthCell } from '../../utils/table.utils';
import { TransferHistoryRecord } from './transfer-history-record.component';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

type TransferHistoryProps = {
    /**
     * The ID of the investment account.
     */
    accountId: string;
};

export const TransferHistory = ({ accountId }: TransferHistoryProps) => {
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId));

    const { categories } = useCategories();
    const transferCategory = categories.find(c => c.accountTransferId === accountId);

    const records = useSelector((state: IStore) =>
        RecordSelectors.selectAllRecordsWithCategory(state, accountId, transferCategory?.id)
    );

    return (
        <Pane>
            <Heading size={700} marginBottom={10}>
                Transfer History
            </Heading>
            <Table border>
                <Table.Head paddingRight={0}>
                    <Table.TextHeaderCell {...w200}>Date</Table.TextHeaderCell>
                    <Table.TextHeaderCell {...w200}>Account</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Description</Table.TextHeaderCell>
                    <Table.TextHeaderCell {...w100}>Debit</Table.TextHeaderCell>
                    <Table.TextHeaderCell {...w100}>Credit</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={300}>
                    {records?.map(record => (
                        <TransferHistoryRecord key={record.id} account={account} record={record} />
                    ))}
                </Table.Body>
            </Table>
        </Pane>
    );
};
