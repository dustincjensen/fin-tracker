import { Table, Popover, Position, Menu, Pane, Tooltip, IconButton } from 'evergreen-ui';
import * as React from 'react';
import { CategorySelect } from '../../components/category-select/category-select.component';
import { IRecord } from '../../store/record/record.interface';
import { formatDate } from '../../utils/date.util';
import { IAccountMonthlyProps } from './account-monthly.props.interface';
import { DeleteSplitRecordsDialog } from './delete-split-records.dialog';
import { EditSplitRecords } from './edit-split-records.component';
import { SplitRecords } from './split-records.component';

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
  const {
    records,
    categories,
    updateCategory,
    updateSplitRecordCategory,
    updateRecordWithSplits,
    deleteRecordSplitRecords,
  } = props;
  const [recordToDeleteFrom, setRecordToDeleteFrom] = React.useState<IRecord>(null);
  const [isSplittingTransaction, setIsSplittingTransaction] = React.useState<string>(undefined);

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
        <Table.HeaderCell flex='none' width={54}></Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {records?.map(record => {
          return (
            <Pane key={record.id}>
              <Table.Row isSelectable>
                <Table.TextCell {...cellDetails}>{formatDate(record.date)}</Table.TextCell>
                <Table.TextCell>{record.description}</Table.TextCell>
                <Table.TextCell {...editableCellDetails}>
                  {!record.splitRecords && (
                    <CategorySelect record={record} categories={categories} updateCategory={updateCategory} />
                  )}
                </Table.TextCell>
                <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                  {record.debit?.toFixed(2) || ''}
                </Table.TextCell>
                <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                  {record.credit?.toFixed(2) || ''}
                </Table.TextCell>
                <Table.TextCell isNumber textAlign='right' {...cellDetails}>
                  {record.balance?.toFixed(2) || ''}
                </Table.TextCell>
                <Table.Cell flex='none' justifyContent='flex-end' width={54}>
                  <Popover
                    position={Position.BOTTOM_RIGHT}
                    content={({ close }) => (
                      <Menu>
                        <Menu.Group>
                          <Menu.Item
                            icon='fork'
                            onSelect={() => {
                              setIsSplittingTransaction(record.id);
                              close();
                            }}
                          >
                            {record.splitRecords ? 'Edit Split Transactions' : 'Split Transaction'}
                          </Menu.Item>
                        </Menu.Group>
                        {record.splitRecords && (
                          <>
                            <Menu.Divider />
                            <Menu.Group>
                              <Menu.Item
                                icon='trash'
                                intent='danger'
                                onSelect={() => {
                                  setRecordToDeleteFrom(record);
                                  close();
                                }}
                              >
                                Delete Split Transactions
                              </Menu.Item>
                            </Menu.Group>
                          </>
                        )}
                      </Menu>
                    )}
                  >
                    <Tooltip content='Options' hideDelay={0}>
                      <IconButton
                        icon='more'
                        appearance='minimal'
                        disabled={
                          (isSplittingTransaction && isSplittingTransaction !== record.id) ||
                          (!record.credit && !record.debit)
                        }
                      />
                    </Tooltip>
                  </Popover>
                </Table.Cell>
              </Table.Row>
              {isSplittingTransaction === record.id && (
                <Pane background='tint1' borderLeft borderRight borderBottom>
                  <EditSplitRecords
                    record={record}
                    categories={categories}
                    updateRecordWithSplits={updateRecordWithSplits}
                    close={() => setIsSplittingTransaction(undefined)}
                  />
                </Pane>
              )}
              {record.splitRecords?.length > 0 && isSplittingTransaction !== record.id && (
                <SplitRecords
                  records={record.splitRecords}
                  categories={categories}
                  updateCategory={(splitRecordId: string, categoryId: string) =>
                    updateSplitRecordCategory(record.id, splitRecordId, categoryId)
                  }
                />
              )}
            </Pane>
          );
        })}
      </Table.Body>

      <DeleteSplitRecordsDialog
        record={recordToDeleteFrom}
        onClose={() => setRecordToDeleteFrom(null)}
        onConfirm={() => setRecordToDeleteFrom(null)}
        deleteRecordSplitRecords={deleteRecordSplitRecords}
      />
    </Table>
  );
};
