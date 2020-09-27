import { Table, Popover, Position, Menu, Pane, Tooltip, IconButton } from 'evergreen-ui';
import * as React from 'react';
import { CategorySelect } from '../../../components/category-select/category-select.component';
import { IRecord } from '../../../store/record/record.interface';
import { formatDate } from '../../../utils/date.util';
import { createStaticWidthCell } from '../../../utils/table.utils';
import { DeleteSplitRecordsDialog } from '../delete-split-records/delete-split-records.dialog';
import { EditAutoCategoryDialog } from '../edit-auto-category/edit-auto-category.dialog';
import { EditDetailsDialog } from '../edit-details/edit-details.dialog';
import { EditSplitRecords } from '../edit-split-records/edit-split-records.component';
import { SplitRecords } from '../split-records/split-records.component';
import { IAccountMonthlyProps } from './account-monthly.props.interface';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

export const AccountMonthly = ({
  records,
  categories,
  updateCategory,
  updateSplitRecordCategory,
}: IAccountMonthlyProps) => {
  const [recordToDeleteFrom, setRecordToDeleteFrom] = React.useState<IRecord>(null);
  const [recordToAddDetails, setRecordToAddDetails] = React.useState<IRecord>(null);
  const [recordToAutoCategorize, setRecordToAutoCategorize] = React.useState<IRecord>(null);
  const [isSplittingTransaction, setIsSplittingTransaction] = React.useState<string>(undefined);

  return (
    <Table>
      {/* Why is paddingRight={17} the default? */}
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell {...w100}>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w200}>Category</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w100}>Debit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w100}>Credit</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w100}>Balance</Table.TextHeaderCell>
        <Table.HeaderCell flex='none' width={54}></Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {records?.map(record => {
          return (
            <Pane key={record.id}>
              <Table.Row isSelectable>
                <Table.TextCell {...w100}>{formatDate(record.date)}</Table.TextCell>
                <Table.TextCell>
                  <Pane>{record.description}</Pane>
                  {record?.details && (
                    <Tooltip content={record?.details} hideDelay={0}>
                      <Pane maxWidth={350} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                        {record?.details}
                      </Pane>
                    </Tooltip>
                  )}
                </Table.TextCell>
                <Table.TextCell {...w200}>
                  {!record.splitRecords && (
                    <CategorySelect
                      record={record}
                      categories={categories}
                      updateCategory={updateCategory}
                      disabled={isSplittingTransaction === record.id}
                    />
                  )}
                </Table.TextCell>
                <Table.TextCell isNumber textAlign='right' {...w100}>
                  {record.debit?.toFixed(2) || ''}
                </Table.TextCell>
                <Table.TextCell isNumber textAlign='right' {...w100}>
                  {record.credit?.toFixed(2) || ''}
                </Table.TextCell>
                <Table.TextCell isNumber textAlign='right' {...w100}>
                  {record.balance?.toFixed(2) || ''}
                </Table.TextCell>
                <Table.Cell flex='none' justifyContent='flex-end' width={54}>
                  <Popover
                    position={Position.BOTTOM_RIGHT}
                    content={({ close }) => (
                      <Menu>
                        <Menu.Group>
                          <Menu.Item
                            icon='edit'
                            onSelect={() => {
                              setRecordToAddDetails(record);
                              setRecordToAutoCategorize(undefined);
                              setIsSplittingTransaction(undefined);
                              close();
                            }}
                          >
                            Edit Details
                          </Menu.Item>
                          <Menu.Item
                            icon='fork'
                            onSelect={() => {
                              setIsSplittingTransaction(record.id);
                              setRecordToAddDetails(undefined);
                              setRecordToAutoCategorize(undefined);
                              close();
                            }}
                          >
                            {record.splitRecords ? 'Edit Split Transactions' : 'Split Transaction'}
                          </Menu.Item>
                          {!record.splitRecords && (
                            <Menu.Item
                              icon='automatic-updates'
                              onSelect={() => {
                                setRecordToAutoCategorize(record);
                                setRecordToAddDetails(undefined);
                                setIsSplittingTransaction(undefined);
                                close();
                              }}
                            >
                              Setup Auto Category
                            </Menu.Item>
                          )}
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
                    onClose={() => setIsSplittingTransaction(undefined)}
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

      <DeleteSplitRecordsDialog record={recordToDeleteFrom} onClose={() => setRecordToDeleteFrom(null)} />

      <EditDetailsDialog record={recordToAddDetails} onClose={() => setRecordToAddDetails(null)} />

      <EditAutoCategoryDialog
        record={recordToAutoCategorize}
        categories={categories}
        onClose={() => setRecordToAutoCategorize(null)}
      />
    </Table>
  );
};
