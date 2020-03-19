import { Table } from 'evergreen-ui';
import * as React from 'react';
import { IAccountMonthlyProps } from './account-monthly.props.interface';

// Controls the width of the date, debit and credit fields.
const cellDetails = {
  flexBasis: 100,
  flexGrow: 0,
  flexShrink: 0,
};

export const AccountMonthly: React.FC<IAccountMonthlyProps> = props => {
  const { records } = props;

  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell {...cellDetails}>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Debit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Credit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Balance</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
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
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {record.balance}
              </Table.TextCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
