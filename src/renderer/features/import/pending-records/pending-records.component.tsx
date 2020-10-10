import { Table } from 'evergreen-ui';
import * as React from 'react';
import { CategorySelect } from '../../../components/category-select/category-select.component';
import { formatDateFull } from '../../../utils/date.utils';
import { createStaticWidthCell } from '../../../utils/table.utils';
import { IPendingRecordsProps } from './pending-records.props.interface';
import './pending-records.module.scss';

const w120 = createStaticWidthCell(120);
const w200 = createStaticWidthCell(200);

export const PendingRecords = ({ records, categories, updatePendingRecordCategory }: IPendingRecordsProps) => {
  return (
    <Table display='flex' flexDirection='column' className='pending_records_wrapper'>
      <Table.Head>
        <Table.TextHeaderCell {...w200}>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w200}>Category</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w120}>Debit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w120}>Credit</Table.TextHeaderCell>
      </Table.Head>
      <Table.VirtualBody>
        {records.map(record => {
          return (
            <Table.Row key={record.id}>
              <Table.TextCell {...w200}>{formatDateFull(record.date)}</Table.TextCell>
              <Table.TextCell>{record.description}</Table.TextCell>
              <Table.Cell {...w200}>
                <CategorySelect record={record} categories={categories} updateCategory={updatePendingRecordCategory} />
              </Table.Cell>
              <Table.TextCell isNumber textAlign='right' {...w120}>
                {record.debit?.toFixed(2) || ''}
              </Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...w120}>
                {record.credit?.toFixed(2) || ''}
              </Table.TextCell>
            </Table.Row>
          );
        })}
      </Table.VirtualBody>
    </Table>
  );
};
