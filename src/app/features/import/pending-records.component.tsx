import { Table } from 'evergreen-ui';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategorySelect } from '../../components/category-select/category-select.component';
import { useCategories } from '../../hooks/categories/use-categories.hook';
import { updatePendingRecordCategory } from '../../store/pending-record/pending-record-slice';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';
import { formatDateFull } from '../../utils/date.utils';
import { createStaticWidthCell } from '../../utils/table.utils';
import './pending-records.css';

const w120 = createStaticWidthCell(120);
const w200 = createStaticWidthCell(200);

const usePendingRecords = () => {
    const pendingRecords = useSelector(PendingRecordSelectors.records);
    const { categories } = useCategories();

    return {
        pendingRecords: useMemo(() => {
            return pendingRecords?.map(r => ({
                ...r,
                category: categories.find(c => c.id === r.categoryId),
                splitRecords: undefined,
            }));
        }, [categories, pendingRecords]),
    };
};

export const PendingRecords = () => {
    const dispatch = useDispatch();

    const { categories } = useCategories();
    const { pendingRecords: records } = usePendingRecords();

    const updateCategory = useCallback(
        (recordId: string, categoryId: string) => dispatch(updatePendingRecordCategory({ recordId, categoryId })),
        [dispatch]
    );

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
                                <CategorySelect
                                    record={record}
                                    categories={categories}
                                    updateCategory={updateCategory}
                                />
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
