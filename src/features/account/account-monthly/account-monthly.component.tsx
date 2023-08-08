import {
    Table,
    Popover,
    Position,
    Menu,
    Pane,
    Tooltip,
    IconButton,
    ManuallyEnteredDataIcon,
    EditIcon,
    ForkIcon,
    AutomaticUpdatesIcon,
    TrashIcon,
    MoreIcon,
} from 'evergreen-ui';
import React from 'react';
import { CategorySelect } from '../../../components/category-select/category-select.component';
import { CategoryTag } from '../../../components/category-tag/category-tag.component';
import { Record } from '../../../models/record.type';
import { formatDate } from '../../../utils/date.utils';
import { createStaticWidthCell } from '../../../utils/table.utils';
import { DeleteRecordDialog } from '../delete-record/delete-record.dialog';
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
    archived,
}: IAccountMonthlyProps) => {
    const [recordToDeleteSplitsFrom, setRecordToDeleteSplitsFrom] = React.useState<Record>(null);
    const [recordToDelete, setRecordToDelete] = React.useState<Record>(null);
    const [recordToAddDetails, setRecordToAddDetails] = React.useState<Record>(null);
    const [recordToAutoCategorize, setRecordToAutoCategorize] = React.useState<Record>(null);
    const [isSplittingTransaction, setIsSplittingTransaction] = React.useState<string>(undefined);

    const onDeleteRecordClose = React.useCallback(() => setRecordToDelete(null), [setRecordToDelete]);
    const onDelteSplitRecordsClose = React.useCallback(
        () => setRecordToDeleteSplitsFrom(null),
        [setRecordToDeleteSplitsFrom]
    );
    const onEditDetailsClose = React.useCallback(() => setRecordToAddDetails(null), [setRecordToAddDetails]);
    const onEditAutoCategoryClose = React.useCallback(
        () => setRecordToAutoCategorize(null),
        [setRecordToAutoCategorize]
    );

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
                {!archived && <Table.HeaderCell flex='none' width={54}></Table.HeaderCell>}
            </Table.Head>
            <Table.Body>
                {records?.map(record => {
                    return (
                        <Pane key={record.id}>
                            <Table.Row isSelectable>
                                <Table.TextCell {...w100}>{formatDate(record.date)}</Table.TextCell>
                                <Table.TextCell>
                                    <Pane display='flex' alignItems='center'>
                                        {record.isManualEntry && (
                                            <Tooltip content='Manually entered'>
                                                <ManuallyEnteredDataIcon marginTop={3} marginRight={10} />
                                            </Tooltip>
                                        )}
                                        <Pane>
                                            <Pane>{record.description}</Pane>
                                            {record?.details && (
                                                <Tooltip content={record?.details}>
                                                    <Pane
                                                        maxWidth={350}
                                                        whiteSpace='nowrap'
                                                        overflow='hidden'
                                                        textOverflow='ellipsis'
                                                    >
                                                        {record?.details}
                                                    </Pane>
                                                </Tooltip>
                                            )}
                                        </Pane>
                                    </Pane>
                                </Table.TextCell>
                                <Table.TextCell {...w200}>
                                    {!archived && !record.splitRecords && (
                                        <CategorySelect
                                            record={record}
                                            categories={categories}
                                            updateCategory={updateCategory}
                                            disabled={isSplittingTransaction === record.id}
                                        />
                                    )}
                                    {archived && record.category && <CategoryTag category={record.category} />}
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
                                {!archived && (
                                    <Table.Cell flex='none' justifyContent='flex-end' width={54}>
                                        <Popover
                                            position={Position.BOTTOM_RIGHT}
                                            content={({ close }) => (
                                                <Menu>
                                                    <Menu.Group>
                                                        <Menu.Item
                                                            icon={EditIcon}
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
                                                            icon={ForkIcon}
                                                            onSelect={() => {
                                                                setIsSplittingTransaction(record.id);
                                                                setRecordToAddDetails(undefined);
                                                                setRecordToAutoCategorize(undefined);
                                                                close();
                                                            }}
                                                        >
                                                            {record.splitRecords
                                                                ? 'Edit Split Transactions'
                                                                : 'Split Transaction'}
                                                        </Menu.Item>
                                                        {!record.splitRecords && (
                                                            <Menu.Item
                                                                icon={AutomaticUpdatesIcon}
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
                                                    {(record.splitRecords || record.isManualEntry) && (
                                                        <>
                                                            <Menu.Divider />
                                                            <Menu.Group>
                                                                {record.splitRecords && (
                                                                    <Menu.Item
                                                                        icon={TrashIcon}
                                                                        intent='danger'
                                                                        onSelect={() => {
                                                                            setRecordToDeleteSplitsFrom(record);
                                                                            close();
                                                                        }}
                                                                    >
                                                                        Delete Split Transactions
                                                                    </Menu.Item>
                                                                )}
                                                                {record.isManualEntry && (
                                                                    <Menu.Item
                                                                        icon={TrashIcon}
                                                                        intent='danger'
                                                                        onSelect={() => {
                                                                            setRecordToDelete(record);
                                                                            close();
                                                                        }}
                                                                    >
                                                                        Delete Transaction
                                                                    </Menu.Item>
                                                                )}
                                                            </Menu.Group>
                                                        </>
                                                    )}
                                                </Menu>
                                            )}
                                        >
                                            <Tooltip content='Options'>
                                                <IconButton
                                                    icon={MoreIcon}
                                                    appearance='minimal'
                                                    disabled={
                                                        (isSplittingTransaction &&
                                                            isSplittingTransaction !== record.id) ||
                                                        (!record.credit && !record.debit)
                                                    }
                                                />
                                            </Tooltip>
                                        </Popover>
                                    </Table.Cell>
                                )}
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

            {!archived && (
                // Modals
                // These use useCallbacks for the onClose method and all are React.memo'ed.
                // This minimizes renders when switching accounts and months in the account view.
                <>
                    <DeleteSplitRecordsDialog record={recordToDeleteSplitsFrom} onClose={onDelteSplitRecordsClose} />
                    <DeleteRecordDialog record={recordToDelete} onClose={onDeleteRecordClose} />
                    <EditDetailsDialog record={recordToAddDetails} onClose={onEditDetailsClose} />
                    <EditAutoCategoryDialog
                        record={recordToAutoCategorize}
                        categories={categories}
                        onClose={onEditAutoCategoryClose}
                    />
                </>
            )}
        </Table>
    );
};
