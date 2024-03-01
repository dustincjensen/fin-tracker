import { Pane, Table, Text, ForkIcon } from 'evergreen-ui';
import React from 'react';
import { CategorySelect } from '../../components/category-select/category-select.component';
import { Category } from '../../models/category.type';
import { createStaticWidthCell } from '../../utils/table.utils';
import { SplitRecordType } from './split-record.type';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

type SplitRecordsProps = {
    /**
     * The split records that are underneath the record.
     */
    records: SplitRecordType[];

    /**
     * The categories to choose from.
     */
    categories: Array<Category>;

    /**
     * The function to update the split record with a category id.
     */
    updateCategory: (splitRecordId: string, categoryId: string) => void;
};

export const SplitRecords = ({ records, categories, updateCategory }: SplitRecordsProps) => {
    if (!records) {
        return null;
    }

    return (
        <Pane>
            {records?.map(record => {
                return (
                    <Pane key={record.id}>
                        <Table.Row isSelectable>
                            <Table.Cell {...w100}></Table.Cell>
                            <Table.Cell alignItems='center'>
                                <ForkIcon color='default' />
                                <Text paddingLeft={15}>{record.description}</Text>
                            </Table.Cell>
                            <Table.TextCell {...w200}>
                                <CategorySelect
                                    record={record}
                                    categories={categories}
                                    updateCategory={updateCategory}
                                />
                            </Table.TextCell>
                            <Table.TextCell isNumber textAlign='right' {...w100}>
                                {(record.debit && record.debit?.toFixed(2)) || ''}
                            </Table.TextCell>
                            <Table.TextCell isNumber textAlign='right' {...w100}>
                                {(record.credit && record.credit?.toFixed(2)) || ''}
                            </Table.TextCell>
                            <Table.Cell {...w100}></Table.Cell>
                            <Table.Cell flex='none' justifyContent='flex-end' width={54}></Table.Cell>
                        </Table.Row>
                    </Pane>
                );
            })}
        </Pane>
    );
};
