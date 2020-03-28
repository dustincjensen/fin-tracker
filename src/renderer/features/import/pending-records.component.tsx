import { Table } from 'evergreen-ui';
import * as React from 'react';
import { IPendingRecordsProps } from './pending-records.props.interface';
import './pending-records.module.scss';

// Controls the width of the date, debit and credit fields.
const cellDetails = {
  flexBasis: 100,
  flexGrow: 0,
  flexShrink: 0,
};

export const PendingRecords: React.FC<IPendingRecordsProps> = props => {
  const { records } = props;

  return (
    <Table display='flex' flexDirection='column' className='pending_records_wrapper'>
      <Table.Head>
        <Table.TextHeaderCell {...cellDetails}>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Debit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Credit</Table.TextHeaderCell>
      </Table.Head>
      <Table.VirtualBody>
        {records.map(record => {
          return (
            <Table.Row key={record.id}>
              <Table.TextCell {...cellDetails}>{record.date}</Table.TextCell>
              <Table.TextCell>{record.description}</Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {record.debit}
              </Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {record.credit}
              </Table.TextCell>
            </Table.Row>
          );
        })}
      </Table.VirtualBody>
    </Table>
  );
};
