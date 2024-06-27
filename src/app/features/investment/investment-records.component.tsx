import { Pane, Table } from 'evergreen-ui';
import React from 'react';
import { useSelector } from 'react-redux';
import { useInvestmentRecords } from '../../hooks/investment-records/use-investment-records.hook';
import { InvestmentRecord as InvestmentRecordType } from '../../models/investment-record.type';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IStore } from '../../store/store.interface';
import { DeleteInvestmentRecordDialog } from './delete-investment-record.dialog';
import { InvestmentRecord } from './investment-record.component';

type InvestmentRecordsProps = {
    /**
     * The ID of the investment account.
     */
    accountId: string;

    /**
     * The currency type.
     */
    currency: string;
};

// TODO support other default currency other than CAD
export const InvestmentRecords = ({ accountId, currency }: InvestmentRecordsProps) => {
    const records = useInvestmentRecords(accountId, currency);
    const [recordToDelete, setRecordToDelete] = React.useState<InvestmentRecordType | undefined>(undefined);
    const { archived } = useSelector((state: IStore) => AccountSelectors.account(state, accountId));

    const clearRecordToDelete = React.useCallback(() => setRecordToDelete(undefined), []);

    return (
        <Pane>
            <Table border>
                <Table.Head paddingRight={0}>
                    <Table.TextHeaderCell>Date</Table.TextHeaderCell>
                    {currency !== 'CAD' && <Table.TextHeaderCell>Exchange Rate</Table.TextHeaderCell>}
                    <Table.TextHeaderCell>Balance</Table.TextHeaderCell>
                    {currency !== 'CAD' && <Table.TextHeaderCell>Converted</Table.TextHeaderCell>}
                    {!archived && <Table.HeaderCell flex='none' width={54}></Table.HeaderCell>}
                </Table.Head>
                <Table.VirtualBody height={300}>
                    {records?.map(record => (
                        <InvestmentRecord
                            key={record.id}
                            record={record}
                            setRecordToDelete={setRecordToDelete}
                            accountArchived={archived}
                        />
                    ))}
                </Table.VirtualBody>
            </Table>

            {recordToDelete && <DeleteInvestmentRecordDialog record={recordToDelete} onClose={clearRecordToDelete} />}
        </Pane>
    );
};
