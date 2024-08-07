import {
    Pane,
    Button,
    majorScale,
    InlineAlert,
    Table,
    TextInput,
    IconButton,
    Strong,
    CrossIcon,
    ForkIcon,
    DollarIcon,
    BanCircleIcon,
    FloppyDiskIcon,
} from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { CategorySelect } from '../../components/category-select/category-select.component';
import { Category } from '../../models/category.type';
import { setSplitRecords as setSplitRecordsAction } from '../../store/record/record-slice';
import { round } from '../../utils/currency.utils';
import { newGuid } from '../../utils/guid.utils';
import { isNullOrWhitespace } from '../../utils/object.utils';
import { createStaticWidthCell } from '../../utils/table.utils';
import { RecordType } from './record.type';
import { SplitRecordType } from './split-record.type';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);
const tableColumnPadding = 12;

function createSplitRecord(): SplitRecordType {
    return { id: newGuid(), description: '', categoryId: undefined, credit: 0.0, debit: 0.0, category: undefined };
}

function getTotal(splitRecords: SplitRecordType[], mapFunc: (value: SplitRecordType) => number): number {
    return splitRecords.map(mapFunc).reduce((sum, d) => round(sum + d), 0.0);
}

function getDebitTotal(splitRecords: SplitRecordType[]): number {
    return getTotal(splitRecords, (value: SplitRecordType) => value.debit);
}

function getCreditTotal(splitRecords: SplitRecordType[]): number {
    return getTotal(splitRecords, (value: SplitRecordType) => value.credit);
}

type EditSplitRecordsProps = {
    /**
     * The record the splits should be associated to.
     */
    record: RecordType;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<Category>;

    /**
     * Function to close the edit split record section.
     */
    onClose: () => void;
};

export const EditSplitRecords = ({ record, categories, onClose }: EditSplitRecordsProps) => {
    const dispatch = useDispatch();
    const [splitRecords, setSplitRecords] = React.useState<SplitRecordType[]>(
        record?.splitRecords || [createSplitRecord(), createSplitRecord()]
    );
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleSubmit = evt => {
        evt.preventDefault();

        const { debit, credit } = record;

        const newErrors: string[] = [];
        if (debit && getDebitTotal(splitRecords) !== debit) {
            newErrors.push('Debits total must match original record.');
        }
        if (debit && splitRecords.some(sr => sr.debit === 0.0)) {
            newErrors.push('All debit values must not be $0.00');
        }
        if (credit && getCreditTotal(splitRecords) !== credit) {
            newErrors.push('Credits total must match original record.');
        }
        if (credit && splitRecords.some(sr => sr.credit === 0.0)) {
            newErrors.push('All credit values must not be $0.00');
        }
        if (splitRecords.some(sr => isNullOrWhitespace(sr.description))) {
            newErrors.push('All records need a description.');
        }
        setErrors(newErrors);

        if (newErrors.length === 0) {
            dispatch(setSplitRecordsAction({ accountId: record.accountId, recordId: record.id, splitRecords }));
            onClose();
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setSplitRecordValue = (id: string, propName: string, value: any) => {
        setSplitRecords(prev => {
            const index = prev.findIndex(r => r.id === id);
            const updatedRecord = {
                ...prev[index],
                [propName]: value,
            };
            return [...prev.slice(0, index), updatedRecord, ...prev.slice(index + 1)];
        });
    };

    const numberChange = (propName: string) => (id: string, value: string) => {
        try {
            const newValue = parseFloat(value || '0.0');
            setSplitRecordValue(id, propName, newValue);
        } catch (error) {}
    };

    const onDebitChange = numberChange('debit');

    const onCreditChange = numberChange('credit');

    const onDescriptionChange = (id: string, value: string) => setSplitRecordValue(id, 'description', value);

    const updateCategory = (splitRecordId: string, categoryId: string) => {
        setSplitRecords(prev => {
            const index = prev.findIndex(r => r.id === splitRecordId);
            const updatedRecord = {
                ...prev[index],
                categoryId: categoryId,
                category: categoryId ? categories.find(c => c.id === categoryId) : undefined,
            };

            if (!categoryId) {
                delete updatedRecord.category;
            }

            return [...prev.slice(0, index), updatedRecord, ...prev.slice(index + 1)];
        });
    };

    const addSplit = () => setSplitRecords(prev => [...prev, createSplitRecord()]);

    const removeSplit = (id: string) =>
        setSplitRecords(prev => {
            const index = prev.findIndex(r => r.id === id);
            return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });

    const canRemoveRow = splitRecords && splitRecords.length > 2;
    const total = record.debit ? getDebitTotal(splitRecords) : record.credit ? getCreditTotal(splitRecords) : 0.0;

    return (
        <Pane>
            <form onSubmit={handleSubmit}>
                {errors?.length > 0 && (
                    <Pane marginLeft={w100.width + tableColumnPadding} paddingTop={20}>
                        {errors.map(e => {
                            return (
                                <InlineAlert key={e} intent='danger'>
                                    {e}
                                </InlineAlert>
                            );
                        })}
                    </Pane>
                )}
                <Pane>
                    {/* Render a "fake" header for the table. */}
                    <Table.Head
                        height={30}
                        alignItems='flex-end'
                        borderBottom='none'
                        paddingRight={0}
                        background='tint1'
                    >
                        <Table.TextHeaderCell {...w100}></Table.TextHeaderCell>
                        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w200}>Category</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}>{record.debit && 'Debit'}</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}>{record.credit && 'Credit'}</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}></Table.TextHeaderCell>
                        <Table.HeaderCell flex='none' width={54}></Table.HeaderCell>
                    </Table.Head>
                    {splitRecords.map(splitRecord => {
                        return (
                            <Table.Row key={splitRecord.id} borderBottom='none' backgroundColor='tint1'>
                                <Table.Cell {...w100} justifyContent='flex-end' paddingRight={3}>
                                    <IconButton
                                        appearance='minimal'
                                        icon={CrossIcon}
                                        disabled={!canRemoveRow}
                                        onClick={() => removeSplit(splitRecord.id)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <TextInput
                                        flex={1}
                                        minWidth={50}
                                        value={splitRecord.description}
                                        onChange={evt => onDescriptionChange(splitRecord.id, evt.target.value)}
                                    />
                                </Table.Cell>
                                <Table.Cell {...w200}>
                                    <CategorySelect
                                        record={splitRecord}
                                        categories={categories}
                                        updateCategory={updateCategory}
                                    />
                                </Table.Cell>
                                <Table.Cell {...w100}>
                                    {!!record.debit && (
                                        <TextInput
                                            width={76}
                                            type='number'
                                            step={0.01}
                                            min={0}
                                            value={splitRecord.debit}
                                            onChange={evt => onDebitChange(splitRecord.id, evt.target.value)}
                                        />
                                    )}
                                </Table.Cell>
                                <Table.Cell {...w100}>
                                    {!!record.credit && (
                                        <TextInput
                                            width={76}
                                            type='number'
                                            step={0.01}
                                            min={0}
                                            value={splitRecord.credit}
                                            onChange={evt => onCreditChange(splitRecord.id, evt.target.value)}
                                        />
                                    )}
                                </Table.Cell>
                                <Table.Cell {...w100}></Table.Cell>
                                <Table.Cell flex='none' justifyContent='flex-end' width={54}></Table.Cell>
                            </Table.Row>
                        );
                    })}
                    {/* Render row for add split and debit/credit total. */}
                    <Table.Row borderBottom='none' marginBottom={majorScale(3)} backgroundColor='tint1'>
                        <Table.Cell {...w100}></Table.Cell>
                        <Table.Cell>
                            <Button type='button' iconBefore={ForkIcon} appearance='primary' onClick={addSplit}>
                                Add Split
                            </Button>
                        </Table.Cell>
                        <Table.Cell {...w200}></Table.Cell>
                        {!!record.credit && <Table.Cell {...w100}></Table.Cell>}
                        <Table.Cell justifyContent='space-between' borderTop {...w100}>
                            <DollarIcon size={14} />
                            <Strong size={400}>{total?.toFixed(2)}</Strong>
                        </Table.Cell>
                        {!!record.debit && <Table.Cell {...w100}></Table.Cell>}
                        <Table.Cell {...w100}></Table.Cell>
                        <Table.Cell flex='none' width={54}></Table.Cell>
                    </Table.Row>
                </Pane>
                {/* Render section for cancel and save */}
                <Pane
                    display='flex'
                    justifyContent='flex-end'
                    borderTop
                    marginLeft={20}
                    marginBottom={20}
                    marginRight={20}
                    paddingTop={10}
                >
                    <Button
                        type='button'
                        iconBefore={BanCircleIcon}
                        height={majorScale(5)}
                        marginRight={10}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button appearance='primary' iconBefore={FloppyDiskIcon} height={majorScale(5)}>
                        Save Splits
                    </Button>
                </Pane>
            </form>
        </Pane>
    );
};
