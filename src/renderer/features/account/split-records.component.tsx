import { Pane, Table, Icon, Text } from 'evergreen-ui';
import * as React from 'react';
import { CategorySelect } from '../../components/category-select/category-select.component';
import { ISplitRecordsProps } from './split-records.props.interface';

// TODO better way to share these common cells? Make a component?
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

export const SplitRecords: React.FC<ISplitRecordsProps> = props => {
  const { records, categories, updateCategory } = props;

  if (!records) {
    return null;
  }

  return (
    <Pane>
      {records?.map(record => {
        return (
          <Pane key={record.id}>
            <Table.Row isSelectable>
              <Table.Cell {...cellDetails}></Table.Cell>
              <Table.Cell alignItems='center'>
                <Icon icon='fork' color='default' />
                <Text paddingLeft={15}>{record.description}</Text>
              </Table.Cell>
              <Table.TextCell {...editableCellDetails}>
                <CategorySelect record={record} categories={categories} updateCategory={updateCategory} />
              </Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {(record.debit && record.debit?.toFixed(2)) || ''}
              </Table.TextCell>
              <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                {(record.credit && record.credit?.toFixed(2)) || ''}
              </Table.TextCell>
              <Table.Cell {...cellDetails}></Table.Cell>
              <Table.Cell flex='none' justifyContent='flex-end' width={54}></Table.Cell>
            </Table.Row>
          </Pane>
        );
      })}
    </Pane>
  );
};
