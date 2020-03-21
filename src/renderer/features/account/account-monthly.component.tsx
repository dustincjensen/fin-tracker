import { Table, Combobox } from 'evergreen-ui';
import * as React from 'react';
import { formatDate } from '../../utils/date.util';
import { IAccountMonthlyProps } from './account-monthly.props.interface';

// Controls the width of the date, debit and credit fields.
const cellDetails = {
  flexBasis: 100,
  flexGrow: 0,
  flexShrink: 0,
};

const editableCellDetails = {
  flexBasis: 200,
  flexGrow: 0,
  flexShrink: 0,
};

export const AccountMonthly: React.FC<IAccountMonthlyProps> = props => {
  const { records, categories, updateCategory } = props;

  return (
    <Table>
      {/* Why is paddingRight={17} the default? */}
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell {...cellDetails}>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell {...editableCellDetails}>Category</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Debit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Credit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...cellDetails}>Balance</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {records?.map(record => {
          return (
            <Table.Row key={record.id}>
              <Table.TextCell {...cellDetails}>{formatDate(record.date)}</Table.TextCell>
              <Table.TextCell>{record.description}</Table.TextCell>
              <Table.Cell {...editableCellDetails}>
                <Combobox
                  items={categories}
                  itemToString={item => (item ? String(item.name) : '')}
                  onChange={selectedCategory => updateCategory(record.id, selectedCategory?.id)}
                  selectedItem={record.category || ''}
                  placeholder='Choose category...'
                  width={170}
                />
              </Table.Cell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {record.debit?.toFixed(2) || ''}
              </Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {record.credit?.toFixed(2) || ''}
              </Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {record.balance?.toFixed(2) || ''}
              </Table.TextCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
