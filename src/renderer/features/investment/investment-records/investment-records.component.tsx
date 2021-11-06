import { Pane, Table } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { IInvestmentRecord } from '../../../store/investment-record/investment-record.interface';
import { IStore } from '../../../store/store.interface';
import { sortByDateDescending } from '../../../utils/record.utils';
import { DeleteInvestmentRecordDialog } from '../delete-investment-record/delete-investment-record.dialog';
import { InvestmentRecord } from '../investment-record/investment-record.component';
import { IInvestmentRecordsProps } from './investment-records.props.interface';

const recordsSelector = createSelector(
  (state: IStore) => state.investmentRecords.records,
  (state: IStore, accountId: string) => accountId,
  (State: IStore, accountId: string, currency: string) => currency,
  (records, accountId, currency) => records[accountId]
    ?.filter(r => r.investmentCurrency === currency)
    .sort(sortByDateDescending) || []
);

// TODO support other default currency other than CAD
export const InvestmentRecords = ({ accountId, currency }: IInvestmentRecordsProps) => {
  const records = useSelector((state: IStore) => recordsSelector(state, accountId, currency));
  const [recordToDelete, setRecordToDelete] = React.useState<IInvestmentRecord>(undefined);
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
          {records?.map(record => <InvestmentRecord key={record.id} record={record} setRecordToDelete={setRecordToDelete} accountArchived={archived} />)}
        </Table.VirtualBody>
      </Table>

      {recordToDelete && <DeleteInvestmentRecordDialog record={recordToDelete} onClose={clearRecordToDelete} />}
    </Pane>
  );
};